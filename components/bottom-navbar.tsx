"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row w-full gap-2">
      <Button
        variant={pathname === "/expenses" ? "default" : "outline"}
        asChild
      >
        <Link href={"/expenses"}>Expenses</Link>
      </Button>
      <Button variant={pathname === "/savings" ? "default" : "outline"} asChild>
        <Link href={"/savings"}>Savings</Link>
      </Button>
    </div>
  );
}
