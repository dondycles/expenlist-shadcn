"use client";
import { FaSpinner, FaTrash } from "react-icons/fa";
import { Button } from "./ui/button";
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

export default function ExpenseEachBar({ expense }: { expense: any }) {
  const [modifying, setModifying] = useState(false);

  const delete_ = async () => {
    setModifying(true);
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

  return (
    <div
      key={expense.id}
      className="w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/10 p-2 gap-2"
    >
      <p className="flex items-center p-2 font-semibold text-primary">
        {expense.name}
      </p>
      <p className="flex items-center p-2 ">{usePhpPeso(expense.cost)}</p>

      <div className="flex flex-row gap-2 ml-auto mr-0">
        {modifying ? (
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
              <DialogFooter className="flex flex-row w-full gap-2 ">
                <DialogClose className="flex-1">
                  <Button variant={"destructive"} onClick={() => delete_()}>
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
