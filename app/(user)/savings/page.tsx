"use client";
import SavingsTotal from "@/components/savings-total";
import SavingsBottomActionButtons from "@/components/savings-bottom-action-buttons";
import SavingsScrollable from "@/components/savings-scrollable";
import { useQuery } from "@tanstack/react-query";
import { getSavings } from "@/actions/save/get";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Savings() {
  var _ = require("lodash");
  const [optimisticUpdate, setOptimisticUpdate] = useState();

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["savings"],
    queryFn: async () => getSavings(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const total = _.sum(
    data && data.data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      {isLoading ? (
        <div className="flex flex-col h-full gap-2">
          <Skeleton className="flex flex-row w-full gap-2 p-2 h-14">
            <Skeleton className="flex-1 h-full bg-white/5" />
            <Skeleton className="h-full aspect-square bg-black/50" />
            <Skeleton className="h-full aspect-square bg-destructive/50" />
          </Skeleton>
          <Skeleton className="flex flex-row w-full gap-2 p-2 h-14">
            <Skeleton className="flex-1 h-full bg-white/5" />
            <Skeleton className="h-full aspect-square bg-black/50" />
            <Skeleton className="h-full aspect-square bg-destructive/50" />
          </Skeleton>
          <Skeleton className="flex flex-row w-full gap-2 p-2 h-14">
            <Skeleton className="flex-1 h-full bg-white/5" />
            <Skeleton className="h-full aspect-square bg-black/50" />
            <Skeleton className="h-full aspect-square bg-destructive/50" />
          </Skeleton>
        </div>
      ) : (
        <SavingsScrollable
          optimisticUpdate={optimisticUpdate}
          savings={data?.data}
        />
      )}
      <SavingsBottomActionButtons
        setOptimistic={(variables) => setOptimisticUpdate(variables)}
      >
        <SavingsTotal total={total} />
      </SavingsBottomActionButtons>
    </div>
  );
}
