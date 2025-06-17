import { db } from "@/db";
import { companions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import CompanionComponent from "./_component/CompanionComponent";
import ConfigureCompanionButton from "./_component/ConfigureCompanionButton";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const id = (await params).slug;

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const companion = await db.query.companions.findFirst({
    where: eq(companions.id, id),
  });

  if (!companion) {
    redirect("/dashboard");
  }

  const { name, topic, subject, id: companionId, voice, style } = companion;

  return (
    <div className="w-full pb-4 space-y-3">
      <div className="flex w-full justify-end">
        <ConfigureCompanionButton companion={companion} />
      </div>
      <CompanionComponent
        userSeconds={session.user.seconds}
        duration={companion.duration}
        companionId={companionId}
        userName={session.user.name}
        userImage={session.user.image}
        topic={topic}
        subject={subject}
        name={name}
        voice={voice}
        style={style}
      />
    </div>
  );
};

export default page;
