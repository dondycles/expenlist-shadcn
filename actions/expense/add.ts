"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addExpense = async ({
  name,
  cost,
  savings_data,
}: {
  name: string;
  cost: string;
  savings_data: any[any];
}) => {
  const supabase = createServerActionClient({ cookies });
  const options = {
    timeZone: "Asia/Manila",
    hour12: false, // Use 24-hour format
  };
  const date = new Date().toLocaleString("en-US", options);

  const { error, data } = await supabase
    .from("expenses")
    .insert([
      {
        cost: cost,
        name: name,
        date: date,
        deduct_to: savings_data ? savings_data.id : null,
      },
    ])
    .select("*")
    .single();

  if (error) return { error: error };

  // revalidatePath("/expenses");

  return { success: data };
};
