import React from "react";
import { eq, sql, and, gte, lt } from "drizzle-orm";

import { eachDayOfInterval, format, subDays } from "date-fns";
import { db } from "@/db";
import { sessionHistories } from "@/db/schema";
import { ActivityBarGraph } from "./ActivityBarChart";
const ActivityChart = async ({ userId }: { userId: string }) => {
  const today = new Date();
  const fiveDaysAgo = subDays(today, 9); // includes today = 5 days total

  // 2. Fetch from Drizzle DB
  const result = await db
    .select({
      day: sql`DATE_TRUNC('day', ${sessionHistories.createdAt})`.as("day"),
      total_duration: sql`SUM(${sessionHistories.duration})`.as(
        "total_duration"
      ),
    })
    .from(sessionHistories)
    .where(
      and(
        eq(sessionHistories.authorId, userId),
        gte(sessionHistories.createdAt, fiveDaysAgo),
        lt(sessionHistories.createdAt, new Date(today.getTime() + 86400000)) // today + 1
      )
    )
    .groupBy(sql`DATE_TRUNC('day', ${sessionHistories.createdAt})`)
    .orderBy(sql`day ASC`);

  // 3. Create a date map from result
  const resultMap = new Map<string, number>();
  result.forEach((r: any) => {
    const key = format(r.day, "yyyy-MM-dd");
    resultMap.set(key, Number(r.total_duration));
  });

  // 4. Pad all 5 days with 0s if missing
  const allDays = eachDayOfInterval({ start: fiveDaysAgo, end: today });
  const paddedData = allDays.map((date) => {
    const key = format(date, "yyyy-MM-dd");
    return {
      day: key,
      total_duration: resultMap.get(key) ?? 0,
    };
  });

  return <ActivityBarGraph data={paddedData} />;
};

export default ActivityChart;
