"use server";
import { toPhDate } from "@/lib/phdate";
import { toPhMmYy } from "@/lib/phmmyy";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getDailyExpenses = async () => {
  const supabase = createServerActionClient({ cookies });
  const year = new Date(toPhDate()).getFullYear();

  const { data } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", toPhMmYy());

  return {
    success: data,
  };
};
