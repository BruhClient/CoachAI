import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { sessionHistories } from "@/db/schema";
import { cn, getPercentageChange } from "@/lib/utils";
import { and, eq, gte, sql } from "drizzle-orm";
import { Activity, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const TotalSessions = async ({ userId }: { userId: string }) => {
  // Get start of today and yesterday
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfToday.getDate() - 1);

  // Query sessions from yesterday and today, grouped by day
  const result = await db
    .select({
      day: sql`DATE_TRUNC('day', ${sessionHistories.createdAt})`.as("day"),
      sessionCount: sql`COUNT(*)`.as("session_count"),
    })
    .from(sessionHistories)
    .where(
      and(
        gte(sessionHistories.createdAt, startOfYesterday),
        eq(sessionHistories.authorId, userId)
      )
    )
    .groupBy(sql`DATE_TRUNC('day', ${sessionHistories.createdAt})`)
    .orderBy(sql`day DESC`);

  let today = 0;
  let yesterday = 0;

  for (const row of result) {
    const day = new Date(row.day as Date).toDateString();
    if (day === startOfToday.toDateString()) {
      today = row.sessionCount as number;
    } else if (day === startOfYesterday.toDateString()) {
      yesterday = row.sessionCount as number;
    }
  }

  const percentage = getPercentageChange(today, yesterday);

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="text-muted-foreground text-sm flex gap-2 items-center">
          <Activity size={15} />
          Total Sessions Today
        </div>
        <div className="flex gap-4 items-center">
          <div className="font-bold text-2xl">{today}</div>
          <div
            className={cn(
              "flex items-center text-sm gap-2",
              today < yesterday ? "text-red-500" : "text-green-500"
            )}
          >
            {today < yesterday ? (
              <TrendingDown size={15} className="text-red-500" />
            ) : (
              <TrendingUp size={15} className="text-green-500" />
            )}
            {percentage}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalSessions;
