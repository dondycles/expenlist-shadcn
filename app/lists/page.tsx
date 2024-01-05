import { ExpenseForm } from "@/components/expense-form";
import ListExpenses from "@/components/list-expenses";
import { Button } from "@/components/ui/button";

export default function Lists() {
  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 py-4 overflow-auto">
      <p className="px-4">
        List all of your expenses for today. {new Date().toDateString()}
      </p>
      <ListExpenses />
      <ExpenseForm />
      <div className="flex flex-row items-center gap-2 px-4">
        <Button size={"icon"}>Prev</Button>
        <p>Total Expenses today: 999</p>
      </div>
    </main>
  );
}
