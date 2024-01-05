"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addSavings = async ({
  name,
  amount,
}: {
  name: string;
  amount: string;
}) => {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase
    .from("savings")
    .insert([{ amount: amount, name: name }]);

  if (error) return { error: error };

  revalidatePath("/savings");

  return { success: "Savings Added!" };
};
