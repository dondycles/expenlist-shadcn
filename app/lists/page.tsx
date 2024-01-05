import { ExpenseForm } from "@/components/expense-form";
import ListBottomActionButtons from "@/components/list-bottom-action-buttons";
import ListExpenses from "@/components/list-expenses";
import ListTotal from "@/components/list-total";

export default function Lists({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const currentDate = new Date();
  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 py-4 overflow-auto  px-4 md:px-32 lg:px-64 xl:px-[512px]">
      <p className="">
        List all of your expenses for today.{" "}
        {searchParams.date
          ? new Date(searchParams.date).toLocaleDateString()
          : currentDate.toLocaleDateString()}{" "}
      </p>

      <ListExpenses date={searchParams.date} />
      {currentDate
        .toLocaleDateString()
        .match(new Date(searchParams.date).toLocaleDateString()) && (
        <ExpenseForm />
      )}
      <ListBottomActionButtons>
        <ListTotal />
      </ListBottomActionButtons>
    </main>
  );
}
