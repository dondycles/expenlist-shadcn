import { usePhpPeso } from "@/lib/phpformatter";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
var _ = require("lodash");
const supabase = createServerComponentClient({ cookies });

export default async function SavingsTotal() {
  const date = new Date().toISOString();
  const { data, error } = await supabase.from("savings").select("amount");

  const total = _.sum(
    data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-row items-center flex-1 gap-2">
      <p>{usePhpPeso(total)}</p>
    </div>
  );
}
