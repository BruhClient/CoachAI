import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { AnimatedGradientHeroText } from "./AnimatedGradientHeroText";
import { BoxReveal } from "../magicui/box-reveal";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-[70vh] ">
      <div className="flex flex-col text-center justify-center items-center gap-5">
        <AnimatedGradientHeroText />
        <BoxReveal>
          <div className="lg:text-6xl text-4xl font-bold max-w-[1200px] text-center">
            Your Personal AI Voice Tutor
          </div>
        </BoxReveal>

        <div className="font-serif font-normal lg:text-xl max-w-[700px] text-lg">
          Coach AI helps you learn faster through natural, voice-based
          conversations. Get instant answers, explanations, and guidance—anytime
          you need
        </div>
      </div>

      <div className="flex gap-3 items-center mt-5">
        <Button asChild>
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link href="#features">
            Learn more
            <ChevronRight />
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Hero;
