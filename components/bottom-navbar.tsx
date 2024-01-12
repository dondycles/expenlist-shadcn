"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { TabsTrigger, TabsList, Tabs } from "./ui/tabs";

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-center w-full gap-1 p-1 bg-primary/25 rounded-[0.5rem]">
      <Button
        variant={pathname === "/expenses" ? "default" : "outline"}
        asChild
        className="flex-1"
        size={"sm"}
      >
        <Link href={"/expenses"}>Expenses</Link>
      </Button>
      <Button
        className="flex-1"
        variant={pathname === "/savings" ? "default" : "outline"}
        asChild
        size={"sm"}
      >
        <Link href={"/savings"}>Savings</Link>
      </Button>
      <Button
        variant={pathname === "/history" ? "default" : "outline"}
        asChild
        className="flex-1"
        size={"sm"}
      >
        <Link href={"/history"}>History</Link>
      </Button>
    </div>
  );
}
