"use client";

import { FaSpinner, FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { deleteExpense } from "@/actions/expense/delete";
import { useState } from "react";
import { usePhpPeso } from "@/lib/phpformatter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { addHistory } from "@/actions/history/add";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ExpenseEachBar({
  expense,
  isOptimistic,
}: {
  expense: any;
  isOptimistic?: boolean;
}) {
  const queryClient = useQueryClient();

  const delete_ = async () => {
    const deleteE = await deleteExpense(expense.id);
    console.log(deleteE.error, deleteE.success);
    const history = await addHistory({
      is_deleted: true,
      is_expense: true,
      is_edit: false,
      savings_data: null,
      expense_data: deleteE.success,
    });
    console.log(history.error, history.success);
  };

  const { mutate: deletee, isPending: deletePending } = useMutation({
    mutationFn: async () => delete_(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  return (
    <div
      key={expense.id}
      className={` w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/10 p-1 gap-1 overflow-x-clip ${
        isOptimistic && "opacity-50"
      }`}
    >
      <p className="flex items-center p-2 font-semibold text-primary">
        {expense.name}
      </p>
      <p className="flex items-center p-2 ">{usePhpPeso(expense.cost)}</p>

      <div className="flex flex-row gap-2 ml-auto mr-0">
        {deletePending ? (
          <div className="flex items-center justify-center w-10 h-10 text-2xl animate-spin">
            <FaSpinner />
          </div>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"destructive"} size={"icon"}>
                <FaTrash />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete?</DialogTitle>
                <DialogDescription>
                  Deleting can't roll back last savings total and can't be
                  undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-row w-full">
                <DialogClose className="flex-1">
                  <Button variant={"destructive"} onClick={() => deletee()}>
                    Confirm
                  </Button>
                </DialogClose>
                <DialogClose className="flex-1">
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
