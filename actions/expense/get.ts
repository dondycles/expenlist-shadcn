"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getExpenses = async (date: string | null) => {
  console.log(date);
  const supabase = createServerActionClient({ cookies });
  const options = {
    timeZone: "Asia/Manila",
    hour12: false, // Use 24-hour format
  };
  const { data, error } = await supabase
    .from("expenses")
    .select("* , savings(*)")
    .eq("date", date ? date : new Date().toLocaleString("en-US", options))
    .order("created_at", { ascending: true });

  if (error) return { error: error };

  revalidatePath("/expenses");

  return { success: data };
};
