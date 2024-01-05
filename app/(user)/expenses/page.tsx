import { ExpenseAddForm } from "@/components/expense-add-form";
import ExpenseBottomActionButtons from "@/components/expense-bottom-action-buttons";
import ExpenseScrollable from "@/components/expense-scrollable";
import ExpenseTotal from "@/components/expense-total";

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
    <main className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <ExpenseScrollable date={searchParams.date} />
      <ExpenseBottomActionButtons>
        <div className="flex flex-row gap-2">
          <ExpenseTotal />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="text-xs shadow-md "
                disabled={
                  !currentDate
                    .toLocaleDateString()
                    .match(new Date(searchParams.date).toLocaleDateString())
                }
                size={"icon"}
              >
                <FaPlus />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <ExpenseAddForm />
            </PopoverContent>
          </Popover>
        </div>
      </ExpenseBottomActionButtons>
    </main>
  );
}
