import { companions } from "@/db/schema";
import React from "react";
import { InferModel } from "drizzle-orm";

import { subjectsColors, subjectsIcons } from "@/lib/constants";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Clock } from "lucide-react";

const CompanionCard = ({
  companion,
}: {
  companion: InferModel<typeof companions>;
}) => {
  //@ts-ignore
  const Icon = subjectsIcons[companion.subject.toLowerCase()];
  //@ts-ignore
  const Color = subjectsColors[companion.subject.toLowerCase()];
  const router = useRouter();
  return (
    <div
      className="bg-card shadow-lg rounded-lg overflow-hidden relative cursor-pointer hover:shadow-xl transition-all duration-300"
      onClick={() => router.push(`/companions/${companion.id}`)}
    >
      <div
        className="w-full h-[150px] flex justify-center items-center"
        style={{ background: Color }}
      >
        <Icon size={40} />
      </div>
      <div className="absolute top-3 right-5 bg-card px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
        {companion.duration} <Clock size={15} />
      </div>
      <div className="px-3 py-2">
        <div className="text-lg font-bold line-clamp-2">{companion.name}</div>
        <div className="text-sm text-muted-foreground">
          {format(companion.createdAt, "dd MMM yyyy")}
        </div>
        <div className="line-clamp-3 text-sm text-muted-foreground">
          {companion.topic}
        </div>
      </div>
    </div>
  );
};

export default CompanionCard;
