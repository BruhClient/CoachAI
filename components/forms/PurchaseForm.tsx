"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatSecondsToMinutes } from "@/lib/utils";
import { pricePerSecond } from "@/lib/constants";
import { usePaymentSheet } from "@/context/payment-sheet-context";

export default function PurchaseForm({
  initialSeconds,
}: {
  initialSeconds: number;
}) {
  const [seconds, setSeconds] = useState(10 * 60);

  const { open } = usePaymentSheet();
  const handleSubmit = () => {
    open(seconds);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-md space-y-4">
      <div className="text-muted-foreground text-sm">
        You own {formatSecondsToMinutes(initialSeconds)}
      </div>
      <Label htmlFor="seconds">Select duration to purchase</Label>

      <Slider
        id="seconds"
        min={10 * 60}
        max={60 * 100}
        step={30}
        defaultValue={[seconds]}
        onValueChange={(val) => setSeconds(val[0])}
      />

      <div>
        <div className="text-center text-lg font-medium">
          {formatSecondsToMinutes(seconds)}
        </div>
        <div className="text-center text-muted-foreground text-sm">
          ${(seconds * pricePerSecond).toFixed(2)}
        </div>
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Purchase
      </Button>
    </div>
  );
}
