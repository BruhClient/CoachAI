import React from "react";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";

const Demo = () => {
  return (
    <div className="max-w-[1200px] ">
      <div className="relative lg:block hidden">
        <Safari url="CoachAI.com" className="size-full" imageSrc="/hero.png" />
      </div>
      <div className="relative block lg:hidden">
        <Iphone15Pro className="size-full " src="/hero-mobile.png" />
      </div>
    </div>
  );
};

export default Demo;
