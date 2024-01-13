"use client";
import SavingsBottomActionButtons from "@/components/savings/savings-bottom-action-buttons";
import SavingsScrollable from "@/components/savings/savings-scrollable";
import { useQuery } from "@tanstack/react-query";
import { getSavings } from "@/actions/save/get";
import { useState } from "react";
import { usePhpPeso } from "@/lib/phpformatter";
import EachBarSkeleton from "@/components/each-bar-skeleton";

export default function Savings() {
  var _ = require("lodash");
  const [optimisticUpdate, setOptimisticUpdate] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["savings"],
    queryFn: async () => getSavings(),
    refetchOnWindowFocus: false,
  });

  const total = _.sum(
    data && data.data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-1 overflow-auto">
      {isLoading ? (
        <div className="flex flex-col h-full gap-2">
          {Array.from({ length: 10 }, (_, i) => (
            <EachBarSkeleton type="savings" key={i} />
          ))}
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
        <p className="flex items-center justify-center flex-1 h-full rounded-md bg-background">
          {usePhpPeso(total)}
        </p>
      </SavingsBottomActionButtons>
    </div>
  );
}
