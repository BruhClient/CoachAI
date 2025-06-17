import React from "react";
import PricingDemo from "./PricingDemo";
import { BoxReveal } from "../magicui/box-reveal";

const Pricing = () => {
  return (
    <div className=" space-y-5" id="pricing">
      <div className="space-y-2 text-center flex justify-center items-center flex-col ">
        <BoxReveal>
          <div className="text-4xl  font-bold ">Pricing</div>
        </BoxReveal>

        <div className="text-lg text-muted-foreground">
          Pay for what you use . It does'nt get as simple as that .
        </div>
      </div>
      <PricingDemo />
    </div>
  );
};

export default Pricing;
