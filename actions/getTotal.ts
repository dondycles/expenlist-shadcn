"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getTotal = async () => {
  var _ = require("lodash");
  const supabase = createServerActionClient({ cookies });
  const { data, error } = await supabase.from("savings").select("amount");
  const total = _.sum(
    data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  if (error) return { error: error };

  return { success: total };
};
