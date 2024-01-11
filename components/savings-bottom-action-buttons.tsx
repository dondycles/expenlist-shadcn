"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
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
        children && "pl-2"
      } flex flex-row gap-2 rounded-md items-center`}
    >
      {children}
      <Popover>
        <PopoverTrigger asChild>
          <Button className="text-xs shadow" size={"icon"}>
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
