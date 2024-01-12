"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getHistory = async ({
  range,
  last,
}: {
  range: string;
  last?: string;
}) => {
  console.log(last);
  const supabase = createServerActionClient({ cookies });
  const { error, data } = await supabase
    .from("history")
    .select("*,expenses(*), user_data(*), savings(*)")
    .order("created_at", { ascending: last ? true : false })
    .range(
      Number(range) > 0 ? Number(range) - 10 : 0,
      range ? Number(range) : 10
    );

  if (error) return { error: error };

  return { data };
};
