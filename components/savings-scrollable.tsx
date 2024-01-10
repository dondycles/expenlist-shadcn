import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import SavingsEachBar from "./savings-each-bar";
import SavingsTotal from "./savings-total";
const supabase = createServerComponentClient({ cookies });

export default async function SavingsScrollable({
  savings,
}: {
  savings: any[any];
}) {
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      {savings?.map((saving: any[any]) => {
        return <SavingsEachBar savings={saving} key={saving.id} />;
      })}
    </div>
  );
}
