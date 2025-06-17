"use server";

import { db } from "@/db";
import { sessionHistories, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const createSessionHistory = async ({
  messages,
  companionId,
  duration,
  companionName,
  companionTopic,
  companionSubject,
}: {
  messages: SavedMessage[];
  companionId: string;
  duration: number;
  companionName: string;
  companionTopic: string;
  companionSubject: string;
}) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized.",
    };
  }
  try {
    console.log({
      messages,
      companionId,
      duration,
      companionName,
      companionSubject,
      companionTopic,
      authorId: session.user.id,
    });
    const data = await db
      .insert(sessionHistories)
      .values({
        messages,
        companionId,
        duration,
        companionName,
        companionSubject,
        companionTopic,
        authorId: session.user.id,
      })
      .returning();
    await db
      .update(users)
      .set({
        seconds: session.user.seconds - duration,
      })
      .where(eq(users.id, session.user.id));
    return {
      success: "Session History created",
      userId: session.user.id,
      data: data[0],
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong.",
    };
  }
};
