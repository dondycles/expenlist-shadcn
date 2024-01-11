"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { UUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const editSavings = async ({
  name,
  amount,
  id,
}: {
  name: string;
  amount: string;
  id: UUID;
}) => {
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase
    .from("savings")
    .update({ name: name, amount: amount })
    .eq("id", id)
    .select()
    .single();

  if (error) return { error: error };

  // revalidatePath("/savings");

  return { success: data };
};
