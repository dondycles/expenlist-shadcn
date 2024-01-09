"use client";
import { useState } from "react";
import { usePhpPeso } from "@/lib/phpformatter";
import { deleteSavings } from "@/actions/save/delete";

import { addHistory } from "@/actions/history/add";

export default function HistoryEachBar({ history }: { history: any[any] }) {
  const [modifying, setModifying] = useState(false);

  const delete_ = async () => {
    setModifying(true);
    const deleteS = await deleteSavings(history.id);
    console.log(deleteS.error, deleteS.success);

    if (deleteS.error) return;
    const historyA = await addHistory({
      expense_data: null,
      savings_data: deleteS.success,
      is_edit: false,
      is_expense: false,
      is_deleted: true,
    });
    console.log(history.error, history.success);
  };

  return (
    <div
      key={history.id}
      className="w-full rounded-[0.5rem] grid grid-cols-4 bg-primary/10 p-2 gap-2"
    >
      <p className="flex items-center p-2 font-semibold text-primary">
        {history.name}
        {history.is_expense ? " (Expense)" : " (Savings)"}
      </p>
      <p className="flex items-center p-2 ">{usePhpPeso(history.amount)}</p>
      {/* <div className="flex flex-row gap-2 ml-auto mr-0">
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
              <DialogFooter>
                <DialogClose>
                  <Button variant={"destructive"} onClick={() => delete_()}>
                    Confirm
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div> */}
      <p className="p-2">
        {/* From{" "}
        {history.is_expense
          ? history.expenses
            ? history.expenses.name
            : "Outside"
          : history.savings
          ? history.savings.name
          : "Outside"}
        {history.is_expense ? " (Expense)" : " (Savings)"} */}
        {history.is_deleted && "DELETE"}
        {history.is_edit && "EDIT"}
        {!history.is_deleted && !history.is_edit && "ADD"}
      </p>
    </div>
  );
}
