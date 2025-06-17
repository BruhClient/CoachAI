import { createSessionHistory } from "@/server/db/sessionHistory";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await createSessionHistory(data);
    return new Response("ok");
  } catch (e) {
    console.error("Session save error:", e);
    return new Response("error", { status: 500 });
  }
}
