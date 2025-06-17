"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePaymentSheet } from "@/context/payment-sheet-context";
import { pricePerSecond } from "@/lib/constants";
import { createCheckout } from "@/server/actions/stripe";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function PaymentSheet() {
  const { isOpen, close, purchasableSeconds } = usePaymentSheet();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !purchasableSeconds) return;

    const getClientSecret = async () => {
      try {
        const secret = await createCheckout({ purchasableSeconds });
        setClientSecret(secret);
      } catch (err) {
        console.error("Failed to fetch client secret:", err);
      }
    };

    getClientSecret();
  }, [isOpen, purchasableSeconds]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="p-0 max-w-md w-full">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Complete your payment</SheetTitle>
          <SheetDescription>
            Secure checkout powered by Stripe.
          </SheetDescription>
        </SheetHeader>

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret }}
            key={"payemnt-intent"}
          >
            <CheckoutForm purchasableSeconds={purchasableSeconds} />
          </Elements>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CheckoutForm({
  purchasableSeconds,
}: {
  purchasableSeconds: number | null;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/return`,
      },
    });

    if (error) {
      console.error("Payment failed:", error.message);
    }

    setIsSubmitting(false);
  };

  const amount = ((purchasableSeconds ?? 0) * pricePerSecond).toFixed(2);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isSubmitting}
        className="w-full bg-black text-white py-2 rounded"
      >
        {isSubmitting ? "Processing..." : `Pay ${amount}`}
      </button>
    </form>
  );
}
