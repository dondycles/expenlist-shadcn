"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteExpense = async (id: UUID) => {
  const supabase = createServerActionClient({ cookies });
  const { error, data } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error };

  revalidatePath("/expenses");

  return { success: data };
};
