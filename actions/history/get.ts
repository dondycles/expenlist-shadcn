"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getHistory = async (range: string) => {
  const supabase = createServerActionClient({ cookies });
  const { error, data } = await supabase
    .from("history")
    .select("*,expenses(*), user_data(*), savings(*)")
    .order("created_at", { ascending: false })
    .range(
      Number(range) > 0 ? Number(range) - 10 : 0,
      range ? Number(range) : 10
    );

  if (error) return { error: error };

  return { data };
};
