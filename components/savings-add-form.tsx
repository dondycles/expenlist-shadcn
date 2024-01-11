"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Please input the cost.",
  }),
  name: z.string().min(1, {
    message: "Please input the name.",
  }),
});

export function SavingsAddForm({
  setOptimistic,
}: {
  setOptimistic: (variable: any | null) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      name: "",
    },
  });

  const [queryClient] = useState(() => useQueryClient());

  const { mutate, isPending, variables } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => onSubmit(values),
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

  useEffect(() => {
    setOptimistic(isPending ? variables : null);
  }, [isPending]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
          mutate(values)
        )}
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
          {isPending ? (
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
