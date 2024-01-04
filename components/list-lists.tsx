import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createServerComponentClient({ cookies });

export default async function ListLists() {
  const { data, error } = await supabase.from("expenses").select("*");

  return (
    <div className="flex flex-col h-full max-h-full gap-2 px-4 overflow-auto">
      {data?.map((expense) => {
        return (
          <div className="w-full rounded-[0.5rem] grid grid-cols-2">
            <p className="font-semibold text-primary">{expense.name}</p>
            <p>{expense.cost}</p>
          </div>
        );
      })}
    </div>
  );
}
