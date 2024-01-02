import Link from "next/link";
import { ModeToggle } from "./theme-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TopNavBarUserButton from "./top-navbar-user-button";
export default async function TopNavBar() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("userId", user.data.user?.id)
    .single();
  return (
    <nav className="flex flex-row items-center justify-between p-4 text-white bg-primary">
      <Link href={"/"} className="text-xl font-extrabold">
        Expenlist.
      </Link>
      <div className="flex flex-row items-center justify-center gap-2">
        <ModeToggle />
        {data && <TopNavBarUserButton user={data} />}
      </div>
    </nav>
  );
}
