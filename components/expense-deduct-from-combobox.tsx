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
import { CommandLoading } from "cmdk";

export function ExpenseDeductFromComboBox({
  cost,
  getCost,
  setSavingsData,
  setNoSavings,
}: {
  cost: number;
  getCost: () => void;
  setSavingsData: (savings: any[any]) => void;
  setNoSavings: (isTrue: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [savings, setSavings] = useState<any[any]>([]);

  const getNamesFromSavings = async () => {
    const { data, error } = await getNames();
    if (error) return;
    setSavings(data);
    if (data.length === 0) return setNoSavings(true);
    setNoSavings(false);
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
            {savings.map((saving: any) => (
              <CommandItem
                key={saving.id}
                value={saving.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setSavingsData(currentValue === value ? null : saving);
                  setOpen(false);
                }}
                className={`${
                  Number(saving.amount) - Number(cost) < 0 && "bg-destructive"
                } mb-1 last:mb-0`}
                disabled={Number(saving.amount) - Number(cost) < 0}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.toLowerCase() === saving.name.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {saving.name} : {usePhpPeso(saving.amount)} - {Number(cost)} ={" "}
                {usePhpPeso(Number(saving.amount) - Number(cost))}
              </CommandItem>
            ))}
            <CommandItem
              onSelect={() => {
                setValue("Do not deduct");
                setSavingsData(null);
                setOpen(false);
              }}
              key={"none"}
              value="None"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === "Do not deduct" ? "opacity-100" : "opacity-0"
                )}
              />
              Do not deduct
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
