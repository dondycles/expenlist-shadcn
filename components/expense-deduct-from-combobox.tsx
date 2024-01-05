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

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ExpenseDeductFromComboBox({
  setId,
}: {
  setId: (id: string | null) => void;
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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value ? value : "Deduct to a savings (Optional)"}
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search from savings..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {names.map((namee: any) => (
              <CommandItem
                key={namee.id}
                value={namee.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setId(currentValue === value ? null : namee.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === namee.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {namee.name} - {usePhpPeso(namee.amount)}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
