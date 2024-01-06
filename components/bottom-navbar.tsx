"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-center w-full gap-2">
      <Button
        variant={pathname === "/expenses" ? "default" : "outline"}
        asChild
        className="flex-1"
      >
        <Link href={"/expenses"}>Expenses</Link>
      </Button>
      <Button
        className="flex-1"
        variant={pathname === "/savings" ? "default" : "outline"}
        asChild
      >
        <Link href={"/savings"}>Savings</Link>
      </Button>
      <Button
        variant={pathname === "/history" ? "default" : "outline"}
        asChild
        className="flex-1"
      >
        <Link href={"/history"}>History</Link>
      </Button>
    </div>
  );
}
