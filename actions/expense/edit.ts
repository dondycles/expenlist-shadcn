"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const editExpense = async ({
  name,
  cost,
  id,
}: {
  name: string;
  cost: string;
  id: UUID;
}) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("expenses")
    .update({ name: name, cost: cost })
    .eq("id", id);

  if (error) return { error: error };

  revalidatePath("/lists");

  return { success: "Expense Edited!" };
};
