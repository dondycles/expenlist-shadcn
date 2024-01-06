import ExpenseBottomActionButtons from "@/components/expense-bottom-action-buttons";
import ExpenseScrollable from "@/components/expense-scrollable";
import ExpenseTotal from "@/components/expense-total";

export default function Lists({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const currentDate = new Date();
  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <ExpenseScrollable date={searchParams.date} />
      <ExpenseBottomActionButtons searchParams={searchParams}>
        <ExpenseTotal />
      </ExpenseBottomActionButtons>
    </main>
  );
}
