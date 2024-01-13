"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toPhDate } from "@/lib/phdate";
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

  const { error, data } = await supabase
    .from("expenses")
    .insert([
      {
        cost: cost,
        name: name,
        date: toPhDate(),
        deduct_to: savings_data ? savings_data.id : null,
      },
    ])
    .select("*")
    .single();

  if (error) return { error: error };

  // revalidatePath("/expenses");

  return { success: data };
};
