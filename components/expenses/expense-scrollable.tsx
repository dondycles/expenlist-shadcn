"use client";
import ExpenseEachBar from "./expense-each-bar";

export default function ExpenseCrollable({
  history,
  optimisticUpdate,
}: {
  history: any[any];
  optimisticUpdate: any | null;
}) {
  return (
    <div className="flex flex-col h-full max-h-full gap-2 overflow-auto">
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
  );
}
