"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getTotal } from "../getTotal";
export const addHistory = async ({
  expense_data,
  savings_data,
  is_edit,
  is_expense,
  is_deleted,
}: {
  expense_data: any[any] | null;
  savings_data: any[any] | null;
  is_edit: boolean;
  is_expense: boolean;
  is_deleted: boolean | null;
}) => {
  const supabase = createServerActionClient({ cookies });

  const total = await getTotal();

  const history = await supabase.from("history").insert([
    {
      expense_id: expense_data ? (!is_deleted ? expense_data.id : null) : null,
      savings_id: savings_data ? (!is_deleted ? savings_data.id : null) : null,
      amount: expense_data ? expense_data.cost : savings_data.amount,
      savings_deducted_total: savings_data ? savings_data.amount : null,
      is_edit: is_edit,
      is_expense: is_expense,
      name: expense_data ? expense_data.name : savings_data.name,
      savings_overall_total: total.success,
      is_deleted: is_deleted,
    },
  ]);

  if (history.error) return { error: history.error };

  revalidatePath("/expenses");

  return { success: "Expense Added!" };
};
