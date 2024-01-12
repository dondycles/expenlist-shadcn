"use client";
import { ScrollArea } from "../ui/scroll-area";
import ExpenseEachBar from "./expense-each-bar";

export default function ExpenseCrollable({
  history,
  optimisticUpdate,
}: {
  history: any[any];
  optimisticUpdate: any | null;
}) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {history?.map((his: any) => {
          return <ExpenseEachBar expense={his} key={his.id} />;
        })}
        {optimisticUpdate && (
          <ExpenseEachBar
            isOptimistic={true}
            expense={optimisticUpdate}
            key={"opt"}
          />
        )}
      </div>
    </ScrollArea>
  );
}
