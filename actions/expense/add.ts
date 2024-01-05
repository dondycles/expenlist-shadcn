"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const addExpense = async ({
  name,
  cost,
  from,
}: {
  name: string;
  cost: string;
  from: string | null;
}) => {
  const supabase = createServerActionClient({ cookies });
  const date = new Date().toDateString();
  console.log(date);
  const { error } = await supabase
    .from("expenses")
    .insert([{ cost: cost, name: name, date: date, deduct_from: from }]);

  if (error) return { error: error };

  revalidatePath("/expenses");

  return { success: "Expense Added!" };
};
