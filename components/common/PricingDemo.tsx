"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { pricePerSecond } from "@/lib/constants";
import { Slider } from "../ui/slider";
import { formatSecondsToMinutes } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const PricingDemo = () => {
  const [seconds, setSeconds] = useState(10 * 60);
  return (
    <Card>
      <CardHeader>
        <CardTitle>${pricePerSecond * 60} per minute</CardTitle>
        <CardDescription>Pay for what you need .</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" space-y-5">
          <div className="space-y-1">
            <div className="font-bold text-3xl">
              {formatSecondsToMinutes(seconds)}
            </div>
            <div className="text-sm text-muted-foreground">
              ${(seconds * pricePerSecond).toFixed(2)}
            </div>
          </div>

          <Slider
            id="seconds"
            min={10 * 60}
            max={60 * 100}
            step={30}
            defaultValue={[seconds]}
            onValueChange={(val) => setSeconds(val[0])}
          />
          <div className="text-center space-y-1">
            <Button className="w-full" asChild>
              <Link href={"/signin"}>Purchase</Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              Get started with 10 FREE minutes !
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingDemo;
