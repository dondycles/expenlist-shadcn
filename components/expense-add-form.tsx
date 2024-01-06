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
import { addExpense } from "@/actions/expense/add";
import { ExpenseDeductFromComboBox } from "./expense-deduct-from-combobox";
import { useEffect, useState } from "react";
import { editSavings } from "@/actions/save/edit";
import { UUID } from "crypto";

const formSchema = z.object({
  cost: z.string().min(1, {
    message: "Please input the cost.",
  }),
  name: z.string().min(1, {
    message: "Please input the name.",
  }),
  from: z.string().nullable(),
});

export function ExpenseAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: "",
      name: "",
      from: "",
    },
  });

  const [costToDeduct, setCostToDeduct] = useState(0);
  const [savingsData, setSavingsData] = useState<any[any]>();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error, success } = await addExpense({
      cost: values.cost,
      name: values.name,
      from: savingsData.id,
    });

    console.log(error, success);
    if (error) return;

    if (!savingsData) return form.reset();
    await editSavings({
      id: values.from as UUID,
      amount: String(Number(savingsData.amount) - Number(values.cost)),
      name: savingsData.name,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
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
          name="cost"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input type="number" placeholder="Cost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ExpenseDeductFromComboBox
          cost={costToDeduct}
          setId={(id) => {
            form.setValue("from", id);
          }}
          getCost={() => {
            setCostToDeduct(Number(form.getValues("cost")));
          }}
          setSavingsData={(savings) => {
            setSavingsData(savings);
            form.setValue("from", savings.id);
          }}
        />
        <Button type="submit" className="text-white shadow ">
          {form.formState.isSubmitting ? (
            <div className="text-2xl animate-spin">
              <FaSpinner />
            </div>
          ) : (
            "ADD"
          )}
        </Button>
      </form>
    </Form>
  );
}
