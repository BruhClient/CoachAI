import { Separator } from "@/components/ui/separator";
import { getSubjectColor, getSubjectIcon } from "@/lib/utils";
import React from "react";

const MessageTranscripts = ({
  messages,
  subject,
}: {
  messages: SavedMessage[];
  subject: string;
}) => {
  const color = getSubjectColor(subject);
  const Icon = getSubjectIcon(subject);

  return (
    <section className="w-full bg-background p-4 shadow-2xl rounded-lg space-y-3 max-w-[1000px]">
      <div className="flex gap-3 items-center">
        <div style={{ background: color }} className="w-fit p-2 rounded-lg">
          <Icon />
        </div>
        <div>
          <div className="font-bold">Message Transcripts</div>
          <div className="text-xs text-muted-foreground">
            View your conversations
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-3 h-[500px] overflow-auto ">
        {messages.map((message, index) => {
          if (message.role === "assistant") {
            return (
              <div
                key={index}
                className="self-start bg-primary text-white p-3 rounded-lg text-sm"
              >
                {message.content}
              </div>
            );
          } else if (message.role === "system") {
            return (
              <div
                className="flex justify-center items-center mb-3 mt-2 relative"
                key={index}
              >
                <div className="text-xs absolute bg-background px-2 text-muted-foreground">
                  {message.content}
                </div>
                <Separator />
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="self-end bg-muted p-3 rounded-lg text-sm"
              >
                {message.content}
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default MessageTranscripts;
