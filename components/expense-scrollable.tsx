import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ExpenseEachBar from "./expense-each-bar";

const supabase = createServerComponentClient({ cookies });

export default async function ExpenseCrollable({ date }: { date: string }) {
  var _ = require("lodash");
  const { data, error } = await supabase
    .from("expenses")
    .select("* , savings(*)")
    .eq("date", date ? date : new Date().toDateString())
    .order("created_at", { ascending: true });
  return (
    <div className="flex flex-col h-full max-h-full gap-2 overflow-auto">
      {data?.map((expense) => {
        return <ExpenseEachBar expense={expense} key={expense.id} />;
      })}
    </div>
  );
}
