import BottomNavBar from "@/components/bottom-navbar";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 h-full max-h-full py-1 md:py-2 px-1 md:px-32 lg:px-64 xl:px-[512px] overflow-auto w-full">
      {children}
      <BottomNavBar />
    </div>
  );
}
