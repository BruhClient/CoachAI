import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sessionHistories } from "@/db/schema";
import { getSubjectColor, getSubjectIcon } from "@/lib/utils";
import { format } from "date-fns";
import { InferModel } from "drizzle-orm";
import React from "react";
import MessageTranscripts from "../../companions/[slug]/_component/MessageTranscripts";
import { Clock } from "lucide-react";

const SessionHistoryCard = ({
  sessionHistory,
}: {
  sessionHistory: InferModel<typeof sessionHistories>;
}) => {
  const Icon = getSubjectIcon(sessionHistory.companionSubject);
  const color = getSubjectColor(sessionHistory.companionSubject);
  const minutes = Math.floor(sessionHistory.duration / 60);
  const seconds = sessionHistory.duration % 60;

  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  console.log(sessionHistory);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-4 w-full cursor-pointer transition-shadow duration-200 ease-in-out rounded-lg py-3 items-center">
          <div
            style={{ background: color }}
            className="w-fit p-2 h-fit rounded-lg"
          >
            <Icon size={17} />
          </div>
          <div className="w-full">
            <div className="flex justify-between ">
              <div className="font-bold line-clamp-1 ">
                {sessionHistory.companionName}
              </div>
              <div className="text-xs text-muted-foreground">
                {format(sessionHistory.createdAt, "dd MMM yyyy")}
              </div>
            </div>

            <div className="text-xs text-muted-foreground font-serif line-clamp-2">
              {sessionHistory.companionTopic}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Details</DialogTitle>
          <DialogDescription className="flex gap-1 items-center">
            {formatted}
            <Clock size={16} />
          </DialogDescription>
        </DialogHeader>
        <MessageTranscripts
          messages={sessionHistory.messages as SavedMessage[]}
          subject={sessionHistory.companionSubject}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SessionHistoryCard;
