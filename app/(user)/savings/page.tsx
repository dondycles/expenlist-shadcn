import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import SavingsScrollable from "@/components/savings-scrollable";
import SavingsTotal from "@/components/savings-total";
import { SavingsAddForm } from "@/components/savings-add-form";
export default function Savings() {
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <SavingsScrollable />
      <div className="flex flex-row gap-2">
        <SavingsTotal />
        <Popover>
          <PopoverTrigger asChild>
            <Button className="text-xs shadow-md " size={"icon"}>
              <FaPlus />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit">
            <SavingsAddForm />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
