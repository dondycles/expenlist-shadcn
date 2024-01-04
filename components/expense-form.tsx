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
import { useState } from "react";
import { addExpense } from "@/actions/expense/add";

const formSchema = z.object({
  cost: z.string().min(1, {
    message: "Please input the cost.",
  }),
  name: z.string().min(1, {
    message: "Please input the name.",
  }),
});

export function ExpenseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error, success } = await addExpense({
      cost: values.cost,
      name: values.name,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
              <FormControl>
                <Input placeholder="Cost" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-white shadow">
          {form.formState.isSubmitting ? (
            <div className=" animate-spin">
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
