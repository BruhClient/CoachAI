import { NextRequest } from "next/server";
import { db } from "@/db";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { companions } from "@/db/schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const take = parseInt(searchParams.get("take") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "0");

  const session = await auth();

  if (!session) {
    return new Response("User is not authorized", { status: 500 });
  }

  try {
    const result = await db.query.companions.findMany({
      where: eq(companions.authorId, session.user.id),
      offset: page * take,
      orderBy: desc(companions.createdAt),
      limit: take,
    });

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
