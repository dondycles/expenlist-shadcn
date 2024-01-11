"use client";
import ExpenseBottomActionButtons from "@/components/expense-bottom-action-buttons";
import ExpenseScrollable from "@/components/expense-scrollable";
import ExpenseTotal from "@/components/expense-total";
import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "@/actions/expense/get";
export default function Expenses({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  var _ = require("lodash");

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["expenses", searchParams.date],
    queryFn: async () => getExpenses(searchParams.date),
  });

  const total = _.sum(
    data && data.success?.map((expense: { cost: any }) => Number(expense.cost))
  );

  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <ExpenseScrollable history={data?.success} />
      <ExpenseBottomActionButtons searchParams={searchParams}>
        <ExpenseTotal total={total} />
      </ExpenseBottomActionButtons>
    </main>
  );
}
