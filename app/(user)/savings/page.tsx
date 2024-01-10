import SavingsTotal from "@/components/savings-total";
import SavingsBottomActionButtons from "@/components/savings-bottom-action-buttons";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SavingsScrollable from "@/components/savings-scrollable";

const supabase = createServerComponentClient({ cookies });
export default async function Savings() {
  var _ = require("lodash");

  const { data, error } = await supabase
    .from("savings")
    .select("*,expenses(*)")
    .order("created_at", { ascending: true });

  const total = _.sum(
    data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <SavingsScrollable savings={data} />
      <SavingsBottomActionButtons>
        <SavingsTotal total={total} />
      </SavingsBottomActionButtons>
    </div>
  );
}
