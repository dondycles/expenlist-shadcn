"use client";

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
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
import { toPhDate } from "@/lib/phdate";

export default function ExpenseBottomActionButtons({
  children,
  searchParams,
  setOptimistic,
  date,
  setDate,
}: {
  children: React.ReactNode;
  searchParams: { date: string };
  setOptimistic: (variables: any | null) => void;
  setDate: (date: string) => void;
  date: string;
}) {
  const currentDate = toPhDate();
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between w-full gap-1 bg-primary/25 rounded-[0.5rem] p-1 shadow">
      <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
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
            selected={new Date(date)}
            onSelect={(e) => {
              setDate(toPhDate(e));
              setOpenCalendar(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-row items-center justify-between flex-1 h-full gap-1 rounded-md">
        {children}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="text-xs shadow "
              disabled={!currentDate.match(toPhDate(searchParams.date))}
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
