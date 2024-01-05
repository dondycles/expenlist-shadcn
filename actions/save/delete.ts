"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteExpense = async (id: UUID) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) return { error: error };

  revalidatePath("/savings");

  return { success: "Savings Deleted!" };
};
