import SavingsEachBar from "./savings-each-bar";

export default function SavingsScrollable({ savings }: { savings: any[any] }) {
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      {savings?.map((saving: any[any]) => {
        return <SavingsEachBar savings={saving} key={saving.id} />;
      })}
    </div>
  );
}
