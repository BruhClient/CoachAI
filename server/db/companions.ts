"use server";

import { db } from "@/db";
import { auth } from "@/lib/auth";
import { CreateCompanionPayload } from "@/schemas/create-companion";
import { companions } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export const createCompanion = async (values: CreateCompanionPayload) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized.",
    };
  }
  try {
    const data = await db
      .insert(companions)
      .values({
        ...values,
        authorId: session.user.id,
      })
      .returning();

    return {
      success: "Companion created.",
      userId: session.user.id,
      data: data[0],
    };
  } catch {
    return {
      error: "Something went wrong.",
    };
  }
};

export const updateCompanion = async (
  id: string,
  values: CreateCompanionPayload
) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized.",
    };
  }
  try {
    const data = await db
      .update(companions)
      .set(values)
      .where(
        and(eq(companions.authorId, session.user.id), eq(companions.id, id))
      )
      .returning();

    revalidatePath(`/companions/${id}`);

    return {
      success: "Companion updated.",
      userId: session.user.id,
      data: data[0],
    };
  } catch {
    return {
      error: "Something went wrong.",
    };
  }
};

export const deleteCompanion = async (id: string) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized.",
    };
  }
  try {
    const data = await db
      .delete(companions)
      .where(eq(companions.id, id))
      .returning();

    return {
      success: "Companion deleted.",
      userId: session.user.id,
      id: data[0].id,
    };
  } catch {
    return {
      error: "Something went wrong.",
    };
  }
};
