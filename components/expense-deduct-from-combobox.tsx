"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNames } from "@/actions/save/getNames";
import { usePhpPeso } from "@/lib/phpformatter";

export function ExpenseDeductFromComboBox({
  setId,
  cost,
  getCost,
  setSavingsData,
}: {
  setId: (id: string | null) => void;
  cost: number;
  getCost: () => void;
  setSavingsData: (savings: any[any]) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [names, setNames] = useState<any[any]>([]);

  const getNamesFromSavings = async () => {
    const { data, error } = await getNames();
    if (error) return;
    setNames(data);
  };

  useEffect(() => {
    getNamesFromSavings();
  }, []);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);
        getCost();
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value ? value : "Deduct to a savings"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search from savings..." />
          <CommandEmpty>No Savings found.</CommandEmpty>
          <CommandGroup>
            {names.map((namee: any) => (
              <CommandItem
                key={namee.id}
                value={namee.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setId(currentValue === value ? null : namee.id);
                  setSavingsData(currentValue === value ? null : namee);
                  setOpen(false);
                }}
                className={`${
                  Number(namee.amount) - Number(cost) < 0 && "bg-destructive"
                } mb-1`}
                disabled={Number(namee.amount) - Number(cost) < 0}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === namee.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {namee.name} : {usePhpPeso(namee.amount)} - {Number(cost)} ={" "}
                {usePhpPeso(Number(namee.amount) - Number(cost))}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
