"use server";

import { pricingPlans } from "@/data/pricingPlans";
import { auth } from "@/lib/auth";
import { pricePerSecond } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckout({
  purchasableSeconds,
}: {
  purchasableSeconds: number;
}) {
  // Create Checkout Sessions from body params.

  const userSession = await auth();
  if (!userSession) return null;

  const price = purchasableSeconds * pricePerSecond;

  const amount = Math.round(purchasableSeconds * pricePerSecond * 100); // Convert to cents

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId: userSession.user.id,
      seconds: purchasableSeconds.toString(),
    },
  });

  return paymentIntent.client_secret;
}
