"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  cn,
  configureAssistant,
  getSessionMessages,
  getSubjectIcon,
} from "@/lib/utils";
import { LottieRefCurrentProps } from "lottie-react";
import { vapi } from "@/lib/vapi";

import MessageTranscripts from "./MessageTranscripts";
import { Button } from "@/components/ui/button";
import { Clock, Mic, MicOff } from "lucide-react";
import CompanionVoiceIcon from "./CompanionVoiceIcon";
import UserVoiceIcon from "./UserVoiceIcon";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSessionTimer } from "../../../../../hooks/useSessionTimer";
import { createSessionHistory } from "@/server/db/sessionHistory";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useQueryClient } from "@tanstack/react-query";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  duration,
  userSeconds,
}: CompanionComponentProps) => {
  const [seconds, setSeconds] = useState(userSeconds);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesRef = useRef<SavedMessage[]>([]);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [startTime, setStartTime] = useState<number | null>(null);
  const { formatted } = useSessionTimer(
    duration * 60,
    callStatus === CallStatus.ACTIVE
  );

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isPending, startTransition] = useTransition();
  const startTimeRef = useRef<number | null>(null);
  useEffect(() => {
    // inside handles , regardless of how the state has changed , it will always track the initial value for useState ( closure )
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE) {
      localStorage.setItem(
        "active-session",
        JSON.stringify({
          startTime: startTime,
          messages: messagesRef.current,
          companionId,
          companionName: name,
          companionSubject: subject,
          companionTopic: topic,
          duration,
        })
      );
    }
  }, [messages, startTime]);

  useEffect(() => {
    const active_session = localStorage.getItem("active-session");

    // Create Session if there is an active previous session
    if (active_session) {
      const data = JSON.parse(active_session);

      startTransition(() => {
        const sessionMessages = getSessionMessages(data.messages);

        const now = Date.now(); // Current time in ms

        const diffInSeconds = Math.floor((now - data.startTime) / 1000);

        createSessionHistory({
          messages: sessionMessages,
          companionId: data.companionId,
          companionName: data.companionName,
          companionSubject: data.companionSubject,
          companionTopic: data.companionTopic,
          duration: diffInSeconds,
        }).then((data: any) => {
          if (data.error) {
            showErrorToast();
          } else {
            setSeconds((prev) => prev - data.data.duration);
            queryClient.setQueryData(
              ["sessionHistory", data.userId],
              (oldData: any) => {
                if (!oldData) {
                  return {
                    pages: [[data.data]],
                    pageParams: [],
                  };
                }
                return {
                  ...oldData,
                  pages: [
                    [data.data, ...oldData.pages[0]],
                    ...oldData.pages.slice(1),
                  ],
                };
              }
            );
            localStorage.removeItem("active-session");
            showSuccessToast("You previous session has been saved");
          }
        });
      });
    }
    // Set the call to active and set the startTime

    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      console.log("CALL STARTED");
      setMessages((prev) => [
        { role: "system", content: "Session Started" },
        ...prev,
      ]);

      setStartTime(Date.now());

      // Set timeout to handle session time out
      if (duration * 60 < seconds) {
        timeoutRef.current = setTimeout(
          // This closure captures the value of startTime at timeout creation time
          // timeout callback lives inside a “time bubble” that traps the values of variables exactly as they were at the moment the timeout was created.
          () => {
            console.log("SESSION HAS ENDED !");
            handleDisconnect();
          },
          duration * 60 * 1000
        );
      } else {
        timeoutRef.current = setTimeout(
          // This closure captures the value of startTime at timeout creation time
          // timeout callback lives inside a “time bubble” that traps the values of variables exactly as they were at the moment the timeout was created.
          () => {
            console.log("SESSION HAS ENDED !");
            handleDisconnect();
          },
          seconds * 60 * 1000
        );
      }

      console.log("Timeout set for", duration, "minutes");
    };

    const onCallEnd = () => {
      if (timeoutRef.current) {
        handleDisconnect();
      }
      setMessages((prev) => [
        { role: "system", content: "Session Ended" },
        ...prev,
      ]);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    // Inactivity
    const onError = (error: Error) => {
      handleDisconnect();
      showErrorToast("Session ended due to inactivity");
      setMessages((prev) => [
        { role: "system", content: "Session Ended" },
        ...prev,
      ]);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const queryClient = useQueryClient();

  const handleCall = async () => {
    if (seconds <= 0) {
      showErrorToast("You have ran out of minutes");
      return;
    }
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style, duration, name, userName },
      clientMessages: ["transcript"],
      serverMessages: [],
    };

    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = async () => {
    startTransition(() => {
      console.log("HANDLE DISCONNECT");
      const sessionMessages = getSessionMessages(messagesRef.current);

      const now = Date.now(); // Current time in ms

      const diffInSeconds = Math.floor((now - startTimeRef.current!) / 1000);
      createSessionHistory({
        messages: sessionMessages,
        companionId,
        companionName: name,
        companionSubject: subject,
        companionTopic: topic,
        duration: diffInSeconds,
      }).then((data: any) => {
        if (data.error) {
          showErrorToast();
        } else {
          setSeconds((prev) => prev - data.data.duration);
          queryClient.setQueryData(
            ["sessionHistory", data.userId],
            (oldData: any) => {
              if (!oldData) {
                return {
                  pages: [[data.data]],
                  pageParams: [],
                };
              }
              return {
                ...oldData,
                pages: [
                  [data.data, ...oldData.pages[0]],
                  ...oldData.pages.slice(1),
                ],
              };
            }
          );
          localStorage.removeItem("active-session");
          showSuccessToast("Session saved");
        }
      });
    });

    setCallStatus(CallStatus.FINISHED);
    // Clear timeout to prevent double entry
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    vapi.stop();
  };

  const Icon = getSubjectIcon(subject);

  return (
    <section className="flex gap-5 flex-col items-center">
      <div className="flex flex-col w-fit gap-3 items-center bg-background p-4 shadow-2xl h-fit rounded-lg">
        <div className="flex justify-between w-full">
          <Badge>
            {formatted} <Clock size={18} />
          </Badge>
          <Badge variant={"outline"}>
            {Math.floor((duration * 60) / 60)
              .toString()
              .padStart(2, "0")}
            :{((duration * 60) % 60).toString().padStart(2, "0")}
            <Clock size={18} />
          </Badge>
        </div>

        <div className="flex gap-2">
          <CompanionVoiceIcon
            lottieRef={lottieRef}
            Icon={Icon}
            subject={subject}
            callStatus={callStatus}
            isSpeaking={isSpeaking}
          />
          <Separator orientation="vertical" />
          <UserVoiceIcon userImage={userImage} userName={userName} />
        </div>

        <div className="text-center">
          <div className="text-bold line-clamp-2 font-bold text-lg">
            {topic}
          </div>
          <div className="text-muted-foreground line-clamp-1 text-sm">
            with {name}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size={"icon"}
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
            variant={"outline"}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors ",
              callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === CallStatus.CONNECTING && "animate-pulse"
            )}
            disabled={isPending}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? "End Session"
              : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
          </Button>
        </div>
      </div>

      <MessageTranscripts messages={messages} subject={subject} />
    </section>
  );
};

export default CompanionComponent;
