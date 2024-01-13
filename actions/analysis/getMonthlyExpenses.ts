"use server";
import { toPhDate } from "@/lib/phdate";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getMonthlyExpenses = async () => {
  const supabase = createServerActionClient({ cookies });
  const year = new Date(toPhDate()).getFullYear();

  const { data: jan } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "0" + year);
  const { data: feb } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "1" + year);
  const { data: mar } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "2" + year);
  const { data: apr } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "3" + year);
  const { data: may } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "4" + year);
  const { data: jun } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "5" + year);
  const { data: jul } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "6" + year);
  const { data: aug } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "7" + year);
  const { data: sep } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "8" + year);
  const { data: oct } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "9" + year);
  const { data: nov } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "10" + year);

  const { data: dec } = await supabase
    .from("expenses")
    .select("*")
    .order("created_at", { ascending: true })
    .eq("mmyy", "11" + year);

  return {
    success: {
      jan: jan,
      feb: feb,
      mar: mar,
      apr: apr,
      may: may,
      jun: jun,
      jul: jul,
      aug: aug,
      sep: sep,
      oct: oct,
      nov: nov,
      dec: dec,
    },
  };
};
