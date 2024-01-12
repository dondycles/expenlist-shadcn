import { ScrollArea } from "../ui/scroll-area";
import SavingsEachBar from "./savings-each-bar";

export default function SavingsScrollable({
  savings,
  optimisticUpdate,
}: {
  savings: any[any];
  optimisticUpdate: any | null;
}) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-1">
        {savings?.map((saving: any[any]) => {
          return <SavingsEachBar savings={saving} key={saving.id} />;
        })}
        {optimisticUpdate && (
          <SavingsEachBar
            isOptimistic={true}
            savings={optimisticUpdate}
            key={"opt"}
          />
        )}
      </div>
    </ScrollArea>
  );
}
