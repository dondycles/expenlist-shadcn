"use client";
import ExpenseBottomActionButtons from "@/components/expenses/expense-bottom-action-buttons";
import ExpenseScrollable from "@/components/expenses/expense-scrollable";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/actions/expense/get";
import { Skeleton } from "@/components/ui/skeleton";
import { usePhpPeso } from "@/lib/phpformatter";
import { useState } from "react";
export default function Expenses({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  var _ = require("lodash");
  const [optimisticUpdate, setOptimisticUpdate] = useState();
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", searchParams.date],
    queryFn: async () => getExpenses(searchParams.date),
    refetchOnWindowFocus: false,
  });

  const total = _.sum(
    data && data.success?.map((expense: { cost: any }) => Number(expense.cost))
  );

  return (
    <main className="flex flex-col w-full h-full max-h-full gap-1 overflow-auto ">
      {isLoading ? (
        <div className="flex flex-col h-full gap-1">
          {Array.from({ length: 10 }, () => (
            <Skeleton className="flex flex-row w-full h-12 gap-1 p-1">
              <Skeleton className="flex-1 h-full bg-white/5" />
              <Skeleton className="h-full aspect-square bg-destructive/50" />
            </Skeleton>
          ))}
        </div>
      ) : (
        <ExpenseScrollable
          optimisticUpdate={optimisticUpdate}
          history={data?.success}
        />
      )}
      <ExpenseBottomActionButtons
        setOptimistic={(expense) => setOptimisticUpdate(expense)}
        searchParams={searchParams}
      >
        <p className="flex items-center justify-center flex-1 h-full rounded-md bg-background">
          {usePhpPeso(total)}
        </p>
      </ExpenseBottomActionButtons>
    </main>
  );
}
