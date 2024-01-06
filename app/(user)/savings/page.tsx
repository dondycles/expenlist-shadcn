import SavingsScrollable from "@/components/savings-scrollable";
import SavingsTotal from "@/components/savings-total";
import SavingsBottomActionButtons from "@/components/savings-bottom-action-buttons";
export default function Savings() {
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <SavingsScrollable />
      <SavingsBottomActionButtons>
        <SavingsTotal />
      </SavingsBottomActionButtons>
    </div>
  );
}
