"use client";

import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpenseAddForm } from "./expense-add-form";
import { useQueryClient } from "@tanstack/react-query";

export default function ExpenseBottomActionButtons({
  children,
  searchParams,
  setOptimistic,
}: {
  children: React.ReactNode;
  searchParams: { date: string };
  setOptimistic: (variables: any | null) => void;
}) {
  const route = useRouter();
  const options = {
    timeZone: "Asia/Manila",
    hour12: false, // Use 24-hour format
  };
  const [date, setDate] = useState<Date>(new Date());
  const currentDate = new Date();
  const [queryClient] = useState(() => useQueryClient());

  useEffect(() => {
    route.push("/expenses?date=" + date.toLocaleDateString("en-US", options));
    queryClient.invalidateQueries({ queryKey: ["expenses", date] });
  }, [date]);

  return (
    <div className="flex flex-row items-center justify-between w-full gap-1 bg-primary/25 rounded-[0.5rem] p-1 shadow">
      <Popover>
        <PopoverTrigger asChild className="p-0">
          <Button
            size={"sm"}
            variant={"outline"}
            className={cn(
              "flex-1  justify-start text-left font-normal border-none",
              !date && "text-muted-foreground p-0 m-0 "
            )}
          >
            <CalendarIcon className="w-4 h-4 mx-2" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex-1 p-0 ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => {
              setDate(new Date(e!.toLocaleString("en-US", options)));
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-row items-center justify-between flex-1 h-full gap-1 rounded-md">
        {children}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="text-xs shadow "
              disabled={
                !currentDate
                  .toLocaleDateString()
                  .match(new Date(searchParams.date).toLocaleDateString())
              }
              size={"sm"}
            >
              <FaPlus />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit">
            <ExpenseAddForm
              setOptimistic={(expense) => setOptimistic(expense)}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Add Button and Total is in the List Page */}
    </div>
  );
}
