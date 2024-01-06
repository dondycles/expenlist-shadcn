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
  savings_id: z.string(),
});

export function ExpenseAddForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cost: "",
      name: "",
      savings_id: "",
    },
  });

  const [costToDeduct, setCostToDeduct] = useState(0);
  const [savingsData, setSavingsData] = useState<any[any]>();
  const [noSavings, setNoSavings] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error, success } = await addExpense({
      cost: values.cost,
      name: values.name,
      deduct_to: values.savings_id,
    });

    console.log(error, success);

    const savings = await editSavings({
      id: values.savings_id as UUID,
      amount: String(Number(savingsData.amount) - Number(values.cost)),
      name: savingsData.name,
    });

    console.log(savings.error, savings.success);

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        {!noSavings && (
          <>
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
              getCost={() => {
                setCostToDeduct(Number(form.getValues("cost")));
              }}
              setSavingsData={(savings) => {
                setSavingsData(savings);
                form.setValue("savings_id", savings.id);
              }}
              setNoSavings={(isTrue) => {
                setNoSavings(isTrue);
              }}
            />
          </>
        )}
        <Button
          disabled={noSavings}
          type="submit"
          variant={noSavings ? "destructive" : "default"}
          className={`text-white shadow `}
        >
          {form.formState.isSubmitting ? (
            <div className="text-2xl animate-spin">
              <FaSpinner />
            </div>
          ) : noSavings ? (
            "No Savings to spend..."
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Form>
  );
}
