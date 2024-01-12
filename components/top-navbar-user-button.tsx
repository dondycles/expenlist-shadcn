"use client";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logOut } from "@/actions/user/logout";
import { useRouter } from "next/navigation";

export default function TopNavBarUserButton({ user }: { user: any }) {
  const route = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <span className="">{user.user_name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            route.push("/profile");
          }}
        >
          <User className="w-4 h-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const { success } = await logOut();
            if (success) route.push("/auth");
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
