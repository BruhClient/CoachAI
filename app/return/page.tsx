import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Return({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const { payment_intent } = await searchParams;

  if (!payment_intent)
    throw new Error("Please provide a valid payment_intent ID (`pi_...`)");

  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  const customerEmail = paymentIntent.receipt_email;

  if (paymentIntent.status !== "succeeded") {
    return redirect("/");
  }

  return (
    <section
      id="success"
      className="w-full flex h-screen justify-center items-center flex-col text-center gap-4 px-2"
    >
      <div className="text-4xl font-bold">Your Payment was Successful! 🎉</div>
      <p className="text-lg max-w-[700px] font-serif">
        A receipt has been sent to{" "}
        <span className="font-semibold">{customerEmail || "your email"}</span>.
        If you have any questions, please email{" "}
        <a href="mailto:orders@example.com" className="font-semibold">
          orders@example.com
        </a>{" "}
        for support.
      </p>
      <Button asChild>
        <Link href={"/dashboard"}>Back to dashboard</Link>
      </Button>
    </section>
  );
}
