import SavingsEachBar from "./savings-each-bar";

export default function SavingsScrollable({
  savings,
  optimisticUpdate,
}: {
  savings: any[any];
  optimisticUpdate: any | null;
}) {
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-1 overflow-auto ">
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
  );
}
