"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import { SavingsAddForm } from "./savings-add-form";

export default function SavingsBottomActionButtons({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2 pl-2 rounded-md">
      {children}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-xs shadow" size={"icon"}>
            <FaPlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit">
          <SavingsAddForm />
        </PopoverContent>
      </Popover>
    </div>
  );
}
