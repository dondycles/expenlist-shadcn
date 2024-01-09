import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SavingsEachBar from "./savings-each-bar";
import SavingsTotal from "./savings-total";
const supabase = createServerComponentClient({ cookies });

export default async function SavingsScrollable() {
  var _ = require("lodash");
  const { data, error } = await supabase
    .from("savings")
    .select("*,expenses(*)")
    .order("created_at", { ascending: true });

  const total = _.sum(
    data?.map((expense: { amount: any }) => Number(expense.amount))
  );
  return (
    <>
      <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
        {error ? (
          <p>{error.message}</p>
        ) : (
          data?.map((savings) => {
            return <SavingsEachBar savings={savings} key={savings.id} />;
          })
        )}
      </div>
      <SavingsTotal total={total} />
    </>
  );
}
