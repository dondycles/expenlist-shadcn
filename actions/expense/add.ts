"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addExpense = async ({
  name,
  cost,
}: {
  name: string;
  cost: string;
}) => {
  const supabase = createServerActionClient({ cookies });
  const date = new Date().toISOString();
  console.log(date);
  const { error } = await supabase
    .from("expenses")
    .insert([{ cost: cost, name: name, date: date }]);

  if (error) return { error: error };

  revalidatePath("/lists");

  return { success: "Expense Added!" };
};
