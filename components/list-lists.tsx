import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const supabase = createServerComponentClient({ cookies });

export default async function ListLists() {
  const { data, error } = await supabase.from("expenses").select("*");

  return (
    <div className="flex flex-col h-full max-h-full gap-2 px-4 overflow-auto">
      {data?.map((expense) => {
        return (
          <div className="w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/5">
            <p className="flex items-center p-2 font-semibold text-primary">
              {expense.name}
            </p>
            <p className="flex items-center p-2 ">{expense.cost}</p>
            <div className="flex flex-row gap-2 ml-auto mr-0">
              <Button variant={"outline"} size={"icon"}>
                <FaPencilAlt />
              </Button>
              <Button variant={"destructive"} size={"icon"}>
                <FaTrash />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
