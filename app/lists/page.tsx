import { ExpenseForm } from "@/components/expense-form";
import ListBottomActionButtons from "@/components/list-bottom-action-buttons";
import ListExpenses from "@/components/list-expenses";
import ListTotal from "@/components/list-total";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
export default function Lists({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const currentDate = new Date();
  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 py-4 overflow-auto  px-4 md:px-32 lg:px-64 xl:px-[512px]">
      <ListExpenses date={searchParams.date} />
      <ListBottomActionButtons>
        <div className="flex flex-row gap-2">
          <ListTotal />
          {currentDate
            .toLocaleDateString()
            .match(new Date(searchParams.date).toLocaleDateString()) && (
            <Popover>
              <PopoverTrigger>
                <Button size={"icon"}>
                  <FaPlus />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit">
                <ExpenseForm />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </ListBottomActionButtons>
    </main>
  );
}
