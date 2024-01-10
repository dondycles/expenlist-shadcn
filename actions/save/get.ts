"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getSavings = async () => {
  const supabase = createServerActionClient({ cookies });
  const { error, data } = await supabase
    .from("savings")
    .select("*,expenses(*)")
    .order("created_at", { ascending: true });

  if (error) return { error: error };

  return { data };
};
