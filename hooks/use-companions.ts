"use client ";

import { DEFAULT_FETCH_LIMIT } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCompanions = ({ userId }: { userId: string | undefined }) => {
  const query = useInfiniteQuery({
    queryKey: ["companions", userId],

    queryFn: async ({ pageParam = 0 }) => {
      console.log("FETCH COMPANIONS");
      const res = await fetch(
        `/api/companions/feed?&take=${DEFAULT_FETCH_LIMIT}&page=${pageParam}`
      );
      if (!res.ok) throw new Error("Failed to fetch Folders");

      return res.json() ?? [];
    },
    staleTime: 3600,
    enabled: !!userId,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < DEFAULT_FETCH_LIMIT) {
        return undefined; // No more pages
      }
      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  return {
    ...query,
    companions: query.data?.pages.flat() ?? [],
  };
};
