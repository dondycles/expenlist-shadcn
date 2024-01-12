"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { SavingsAddForm } from "./savings-add-form";

export default function SavingsBottomActionButtons({
  children,
  setOptimistic,
}: {
  children: React.ReactNode | null;
  setOptimistic: (variables: any | null) => void;
}) {
  return (
    <div
      className={`${
        children && "p-1"
      } flex flex-row gap-1 items-center bg-primary/25 rounded-[0.5rem]`}
    >
      {children}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-xs shadow" size={"sm"}>
            <FaPlus />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-fit">
          <SavingsAddForm
            setOptimistic={(variables) => setOptimistic(variables)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
