"use client";

import { Skeleton } from "./ui/skeleton";

export default function EachBarSkeleton({ type }: { type: string }) {
  return (
    <Skeleton className="flex flex-row w-full h-12 gap-1 p-1">
      <Skeleton className="flex-1 h-full bg-white/5" />
      {type === "savings" && (
        <Skeleton className="h-full aspect-square bg-black/50" />
      )}
      <Skeleton className="h-full aspect-square bg-destructive/50" />
    </Skeleton>
  );
}
