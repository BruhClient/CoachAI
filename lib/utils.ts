import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { subjectsColors, subjectsIcons, voices } from "./constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { LucideIcon } from "lucide-react";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractFileKey(fileUrl: string): string | null {
  const match = fileUrl.match(/\/f\/([^/]+)/);
  return match ? match[1] : null;
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[
    subject.toLocaleLowerCase() as keyof typeof subjectsColors
  ];
};

export const getSubjectIcon = (subject: string) => {
  return subjectsIcons[
    subject.toLocaleLowerCase() as keyof typeof subjectsIcons
  ] as LucideIcon;
};
export const configureAssistant = (voice: string, style: string) => {
  const voiceId =
    voices[voice as keyof typeof voices][
      style as keyof (typeof voices)[keyof typeof voices]
    ] || "sarah";

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage:
      "Hello {{userName}}, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 1,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    You impersonate a person called {{name}} and are talking to a person called {{userName}}.
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    The conversation will end in {{duration}}. Keep the conversation within this timeframe.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },

    //@ts-ignore
    clientMessages: [],

    //@ts-ignore
    serverMessages: [],
  };
  return vapiAssistant;
};

export const getSessionMessages = (messages: SavedMessage[]) => {
  const searchTerm = {
    role: "system",
    content: "Session Started",
  };

  const latestSessionStartIndex = [...messages].findIndex(
    (msg) => msg.role === searchTerm.role && msg.content === searchTerm.content
  );

  return [...messages.slice(0, latestSessionStartIndex)] as SavedMessage[];
};

export function formatSecondsToMinutes(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const paddedMins = mins.toString().padStart(2, "0");
  const paddedSecs = secs.toString().padStart(2, "0");
  return `${paddedMins}:${paddedSecs}`;
}

export function getPercentageChange(today: number, yesterday: number): string {
  if (yesterday === 0) {
    if (today === 0) return "0%";
    return "100%"; // or "100%" if you prefer
  }

  const change = ((today - yesterday) / yesterday) * 100;

  const rounded = change.toFixed(1);
  return `${rounded}%`;
}
