"use client";

import useSessionUser from "@/hooks/use-session-user";
import React from "react";
import { useSessionHistory } from "@/hooks/use-session-history";
import SessionHistoryCard from "./SessionHistoryCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SessionHistoryList = () => {
  const user = useSessionUser();

  const { sessions, fetchNextPage, hasNextPage, isFetching } =
    useSessionHistory({
      userId: user?.id,
    });

  if (!user) {
    return <Skeleton className="w-full min-h-[50px] " />;
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      {sessions.map((session) => {
        return (
          <div key={session.id}>
            <SessionHistoryCard sessionHistory={session} />
          </div>
        );
      })}
      {isFetching && (
        <>
          <Skeleton className="w-full min-h-[50px] " />
          <Skeleton className="w-full min-h-[50px] " />
        </>
      )}
      {hasNextPage && !isFetching && (
        <Button variant={"ghost"} onClick={() => fetchNextPage()}>
          View more <ChevronDown />
        </Button>
      )}

      <div></div>
    </div>
  );
};

export default SessionHistoryList;
