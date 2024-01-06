"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addExpense = async ({
  name,
  cost,
  deduct_to,
}: {
  name: string;
  cost: string;
  deduct_to: string | null;
}) => {
  const supabase = createServerActionClient({ cookies });
  const date = new Date().toDateString();
  const { error } = await supabase
    .from("expenses")
    .insert([{ cost: cost, name: name, date: date, deduct_to: deduct_to }]);

  if (error) return { error: error };

  revalidatePath("/expenses");

  return { success: "Expense Added!" };
};
