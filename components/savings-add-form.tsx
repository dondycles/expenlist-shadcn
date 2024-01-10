"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useOptimisticSavings } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaSpinner } from "react-icons/fa";
import { addSavings } from "@/actions/save/add";
import { addHistory } from "@/actions/history/add";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Please input the cost.",
  }),
  name: z.string().min(1, {
    message: "Please input the name.",
  }),
});

export function SavingsAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      name: "",
    },
  });

  const optimisticSavings = useOptimisticSavings();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    optimisticSavings.optAddSavings(values);
    const savings = await addSavings({
      amount: values.amount,
      name: values.name,
    });
    console.log(savings.error, savings.success);
    if (savings.error) return;

    const history = await addHistory({
      expense_data: null,
      savings_data: savings.success,
      is_deleted: false,
      is_edit: false,
      is_expense: false,
    });
    console.log(history.error, history.success);
    if (history.error) return;

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="number" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-white shadow ">
          {form.formState.isSubmitting ? (
            <div className="text-2xl animate-spin">
              <FaSpinner />
            </div>
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Form>
  );
}
