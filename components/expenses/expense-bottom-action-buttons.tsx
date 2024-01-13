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

export default function ExpenseBottomActionButtons({
  children,
  searchParams,
  setOptimistic,
  setDate_,
}: {
  children: React.ReactNode;
  searchParams: { date: string };
  setOptimistic: (variables: any | null) => void;
  setDate_: (date: string) => void;
}) {
  const options = {
    timeZone: "Asia/Manila",
    hour12: false, // Use 24-hour format
  };
  const currentDate = new Date().toLocaleDateString("en-US", options);
  const [date, setDate] = useState<Date | string>(new Date());

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
            selected={date as Date}
            onSelect={(e) => {
              setDate(new Date(e!).toLocaleDateString("en-US", options));
              setDate_(new Date(e!).toLocaleDateString("en-US", options));
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
                !currentDate.match(
                  new Date(searchParams.date).toLocaleDateString(
                    "en-US",
                    options
                  )
                )
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
    </div>
  );
}
