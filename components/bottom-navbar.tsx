"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ArrowBigDown, ArrowBigUp, History, Activity } from "lucide-react";

export default function BottomNavBar() {
  const pathname = usePathname();
  return (
    <div className="flex gap-1 flex-row justify-center w-fit mx-auto  rounded-t-[0.5rem] bg-background p-1 ">
      <Button
        variant={pathname === "/expenses" ? "default" : "ghost"}
        asChild
        className={`flex items-center justify-center text-xs  ${
          pathname === "/expenses" && "shadow"
        }`}
        size={"icon"}
      >
        <Link href={"/expenses"}>
          <ArrowBigDown className="w-6 h-6" />
        </Link>
      </Button>
      <Button
        className={`flex items-center justify-center text-xs  ${
          pathname === "/savings" && "shadow"
        }`}
        variant={pathname === "/savings" ? "default" : "ghost"}
        asChild
        size={"icon"}
      >
        <Link href={"/savings"}>
          <ArrowBigUp className="w-6 h-6" />
        </Link>
      </Button>
      <Button
        variant={pathname === "/history" ? "default" : "ghost"}
        asChild
        className={`flex items-center justify-center text-xs  ${
          pathname === "/history" && "shadow"
        }`}
        size={"icon"}
      >
        <Link href={"/history"}>
          <History className="w-6 h-6" />
        </Link>
      </Button>
      <Button
        variant={pathname === "/analysis" ? "default" : "ghost"}
        asChild
        className={`flex items-center justify-center text-xs  ${
          pathname === "/analysis" && "shadow"
        }`}
        size={"icon"}
      >
        <Link href={"/analysis"}>
          <Activity className="w-6 h-6" />
        </Link>
      </Button>
    </div>
  );
}
