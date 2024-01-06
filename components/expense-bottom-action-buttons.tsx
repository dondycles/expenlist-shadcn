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
}: {
  children: React.ReactNode;
  searchParams: { date: string };
}) {
  const route = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const currentDate = new Date();
  useEffect(() => {
    route.push("/expenses?date=" + date.toDateString());
  }, [date]);

  return (
    <div className="flex flex-row items-center justify-between w-full gap-2">
      <Popover>
        <PopoverTrigger asChild className="p-0">
          <Button
            variant={"outline"}
            className={cn(
              "flex-1  justify-start text-left font-normal",
              !date && "text-muted-foreground p-0 m-0"
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
              setDate(new Date(e!.toDateString()));
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex flex-row items-center justify-between flex-1 gap-2 pl-2 rounded-md bg-primary">
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
      {/* Add Button and Total is in the List Page */}
    </div>
  );
}
