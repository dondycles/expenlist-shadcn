import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ExpenseBar from "./expense-bar";

const supabase = createServerComponentClient({ cookies });

export default async function ListExpenses({ date }: { date: string }) {
  var _ = require("lodash");
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("date", date ? date : new Date().toISOString());
  console.log(date);
  return (
    <div className="flex flex-col h-full max-h-full gap-2 overflow-auto">
      {data?.map((expense) => {
        return <ExpenseBar expense={expense} key={expense.id} />;
      })}
    </div>
  );
}
