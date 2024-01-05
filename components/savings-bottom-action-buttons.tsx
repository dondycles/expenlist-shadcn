"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

export default function ExpenseBottomActionButtons({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = useRouter();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    route.push("/expenses?date=" + date.toDateString());
  }, [date]);

  return (
    <div className="flex flex-row items-center justify-between w-full gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
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
      {children}
    </div>
  );
}
