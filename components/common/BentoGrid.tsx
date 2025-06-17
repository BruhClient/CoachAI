"use client";

import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CreateCompanionForm from "../forms/CreateCompanionForm";
import { cn, getSubjectColor } from "@/lib/utils";
import { FlaskConical, Mic } from "lucide-react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/lottie/soundwaves.json";
import Image from "next/image";
import { Button } from "../ui/button";
import { AnimatedSessionHistories } from "./AnimatedSessionHistories";
import { BoxReveal } from "../magicui/box-reveal";
const BentoGrid = () => {
  return (
    <div
      className="w-full gap-3 flex justify-center items-center flex-col"
      id="features"
    >
      <div className="space-y-2 text-center flex items-center justify-center flex-col">
        <BoxReveal>
          <div className="text-4xl  font-bold ">Features</div>
        </BoxReveal>

        <div className="text-lg text-muted-foreground">
          Configure your AI Tutor and begin your lesson.
        </div>
      </div>
      <div className="grid grid-cols-12 w-full max-w-[1200px] gap-2 ">
        <MainBlock />
        <VoiceChatBlock />
        <SessionHistoryBlock />
      </div>
    </div>
  );
};

const MainBlock = () => {
  return (
    <div className="grid lg:col-span-8 col-span-12 lg:row-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Step 1 : Configure AI Companion</CardTitle>
          <CardDescription>
            Create an AI Companion by filling up a form
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center h-full items-center">
          <CreateCompanionForm isDisabled />
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start gap-1">
          <div className="text-lg font-bold">Use Descriptive Prompts</div>
          <div className="text-muted-foreground text-sm">
            Our Ai tutors are trained to be focused on your subject and topic
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

const VoiceChatBlock = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      lottieRef.current?.play();
    }
  }, [lottieRef]);
  return (
    <div className="grid lg:col-span-4 col-span-12 ">
      <Card>
        <CardHeader>
          <CardTitle>Step 2 : Trigger your AI Companion</CardTitle>
          <CardDescription>
            Interact with our Smooth VoiceChat UI
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center w-full items-center">
          <div className="flex gap-4">
            <div
              className={cn(
                "transition-opacity duration-1000 relative flex items-center justify-center w-fit"
              )}
            >
              <div
                style={{ background: getSubjectColor("science") }}
                className="p-2 rounded-lg w-[130px] h-[130px] flex justify-center items-center"
              >
                <FlaskConical size={50} />
              </div>

              <div className={cn("absolute transition-opacity duration-1000 ")}>
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                />
              </div>
            </div>
            <div>
              <Image
                src={"/profile.png"}
                alt={"profile"}
                width={130}
                height={130}
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center ">
            <Button size={"icon"} variant={"outline"}>
              <Mic />
            </Button>
            <Button variant={"destructive"}>End Session</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SessionHistoryBlock = () => {
  return (
    <div className="grid lg:col-span-4 col-span-12 ">
      <Card>
        <CardHeader>
          <CardTitle>Step 3 : View your session history</CardTitle>
          <CardDescription>See past message transcripts</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatedSessionHistories />
        </CardContent>
      </Card>
    </div>
  );
};
export default BentoGrid;
