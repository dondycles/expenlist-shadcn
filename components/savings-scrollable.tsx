import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SavingsEachBar from "./savings-each-bar";

const supabase = createServerComponentClient({ cookies });

export default async function SavingsScrollable() {
  var _ = require("lodash");
  const { data, error } = await supabase
    .from("savings")
    .select("*,expenses(*)")
    .order("created_at", { ascending: true });
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      {data?.map((savings) => {
        return <SavingsEachBar savings={savings} key={savings.id} />;
      })}
    </div>
  );
}
