"use server";
import { toPhMmYy } from "@/lib/phmmyy";
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
  const { error, data } = await supabase
    .from("savings")
    .insert([{ amount: amount, name: name, mmyy: toPhMmYy() }])
    .select()
    .single();

  if (error) return { error: error };

  // revalidatePath("/savings");

  return { success: data };
};
