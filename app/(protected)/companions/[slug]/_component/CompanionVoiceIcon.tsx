import { cn, getSubjectColor } from "@/lib/utils";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { LucideIcon } from "lucide-react";
import React, { RefObject } from "react";
import soundwaves from "@/lottie/soundwaves.json";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const CompanionVoiceIcon = ({
  lottieRef,
  Icon,
  subject,
  callStatus,
  isSpeaking,
}: {
  lottieRef: RefObject<LottieRefCurrentProps | null>;
  Icon: LucideIcon;
  subject: string;
  callStatus: string;
  isSpeaking: boolean;
}) => {
  return (
    <div
      className={cn(
        "transition-opacity duration-1000 relative flex items-center justify-center w-fit",

        callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
      )}
    >
      <div
        style={{ background: getSubjectColor(subject) }}
        className="p-2 rounded-lg w-[130px] h-[130px] flex justify-center items-center"
      >
        <Icon size={50} />
      </div>

      <div
        className={cn(
          "absolute transition-opacity duration-1000 ",
          callStatus === CallStatus.ACTIVE && isSpeaking
            ? "opacity-100"
            : "opacity-0"
        )}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={soundwaves}
          autoplay={false}
        />
      </div>
    </div>
  );
};

export default CompanionVoiceIcon;
