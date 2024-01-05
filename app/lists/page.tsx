import { ExpenseForm } from "@/components/expense-form";
import ListBottomActionButtons from "@/components/list-bottom-action-buttons";
import ListExpenses from "@/components/list-expenses";
import ListTotal from "@/components/list-total";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { Suspense } from "react";
export default function Lists({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const currentDate = new Date();
  return (
    <main className="flex flex-col w-full h-full max-h-full gap-2 py-4 overflow-auto  px-4 md:px-32 lg:px-64 xl:px-[512px]">
      <Suspense
        fallback={
          <div className="flex flex-col w-full gap-2">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        }
      >
        <ListExpenses date={searchParams.date} />
      </Suspense>
      <ListBottomActionButtons>
        <div className="flex flex-row gap-2">
          <ListTotal />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="text-xs shadow-md disabled"
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
              <ExpenseForm />
            </PopoverContent>
          </Popover>
        </div>
      </ListBottomActionButtons>
    </main>
  );
}
