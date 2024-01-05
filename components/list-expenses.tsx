import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ExpenseBar from "./expense-bar";

const supabase = createServerComponentClient({ cookies });

export default async function ListExpenses() {
  const { data, error } = await supabase.from("expenses").select("*");

  return (
    <div className="flex flex-col h-full max-h-full gap-2 px-4 overflow-auto">
      {data?.map((expense) => {
        return <ExpenseBar expense={expense} key={expense.id} />;
      })}
    </div>
  );
}
