import React, { Suspense } from "react";
import SessionHistoryList from "./_component/SessionHistoryList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import ActivityChart from "./_component/ActivityChart";
import { redirect } from "next/navigation";
import TotalMinutes from "./_component/TotalMinutes";
import TotalSessions from "./_component/TotalSessions";
import UserMinutes from "./_component/UserMinutes";

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full space-y-3 pb-4">
      <div className="flex w-full gap-2 flex-wrap">
        <Suspense>
          <TotalMinutes userId={session.user.id} />
        </Suspense>
        <Suspense>
          <TotalSessions userId={session.user.id} />
        </Suspense>
        <UserMinutes userMinutes={session.user.seconds} />
      </div>
      <div className="flex gap-3 flex-wrap lg:flex-row flex-col">
        <Card className="max-w-[500px] w-full ">
          <CardHeader>
            <CardTitle>Session History</CardTitle>
            <CardDescription>View most recent sessions</CardDescription>
          </CardHeader>
          <CardContent className=" h-[400px] overflow-auto">
            <SessionHistoryList />
          </CardContent>
        </Card>
        <div className="flex-1">
          <Suspense>
            <ActivityChart userId={session.user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
