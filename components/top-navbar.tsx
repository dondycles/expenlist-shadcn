import Link from "next/link";
import { ModeToggle } from "./theme-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TopNavBarUserButton from "./top-navbar-user-button";

const supabase = createServerComponentClient({ cookies });

export default async function TopNavBar() {
  const user = await supabase.auth.getUser();
  const { data } = await supabase
    .from("user_data")
    .select("*")
    .eq("user_id", user.data.user?.id)
    .single();
  return (
    <nav className="flex flex-row items-center justify-between py-4 text-primary-foreground bg-primary px-4 md:px-32 lg:px-64 xl:px-[512px]">
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
