"use client";

import { useCompanions } from "@/hooks/use-companions";
import useSessionUser from "@/hooks/use-session-user";
import React, { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import CompanionCard from "./CompanionCard";
import { Skeleton } from "@/components/ui/skeleton";
const CompanionList = () => {
  const user = useSessionUser();

  const { companions, fetchNextPage, hasNextPage, isFetching } = useCompanions({
    userId: user?.id,
  });
  const lastFolderRef = useRef(null);
  const { ref, entry } = useIntersection({
    root: lastFolderRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [entry]);
  if (!user) {
    return <Skeleton className="w-full min-h-[235px] break-inside-avoid" />;
  }
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 2xl:columns-4 gap-4 space-y-4 py-4">
      {companions.map((companion, index) => {
        if (index >= companions.length - 1) {
          return (
            <div key={companion.id} ref={ref} className="break-inside-avoid">
              <CompanionCard companion={companion} />
            </div>
          );
        }
        return (
          <div key={companion.id} className="break-inside-avoid">
            <CompanionCard companion={companion} />
          </div>
        );
      })}
      {isFetching && (
        <Skeleton className="w-full min-h-[235px] break-inside-avoid" />
      )}
    </div>
  );
};

export default CompanionList;
