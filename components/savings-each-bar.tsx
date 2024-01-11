"use client";
import { FaPencilAlt, FaSpinner, FaTrash } from "react-icons/fa";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { editSavings } from "@/actions/save/edit";
import { usePhpPeso } from "@/lib/phpformatter";
import { deleteSavings } from "@/actions/save/delete";
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

export default function SavingsEachBar({
  savings,
  isOptimistic,
}: {
  savings: any;
  isOptimistic?: boolean;
}) {
  const [confirm, setConfirm] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: savings.name,
    amount: savings.amount,
  });

  const [queryClient] = useState(() => useQueryClient());

  const delete_ = async () => {
    const deleteS = await deleteSavings(savings.id);
    console.log(deleteS.error, deleteS.success);

    if (deleteS.error) return;
    const history = await addHistory({
      expense_data: null,
      savings_data: deleteS.success,
      is_edit: false,
      is_expense: false,
      is_deleted: true,
    });
    console.log(history.error, history.success);
  };

  const edit_ = async () => {
    if (
      editedValue.amount === savings.amount &&
      editedValue.name === savings.name
    ) {
      setConfirm(false);
      return;
    }

    const savingsE = await editSavings({
      amount:
        editedValue.amount === savings.amount
          ? savings.amount
          : editedValue.amount,
      name: editedValue.name === savings.name ? savings.name : editedValue.name,
      id: savings.id,
    });

    console.log(savingsE.error, savingsE.success);

    if (savingsE.error) return;

    const history = await addHistory({
      expense_data: null,
      savings_data: savingsE.success,
      is_deleted: false,
      is_edit: true,
      is_expense: false,
    });

    console.log(history.error, history.success);
    if (history.error) return;

    setConfirm(false);
  };

  const { mutate: editt, isPending: editPending } = useMutation({
    mutationFn: async () => edit_(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });
  const { mutate: deletee, isPending: deletePending } = useMutation({
    mutationFn: async () => delete_(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savings"] });
    },
  });

  return (
    <div
      key={savings.id}
      className={`w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/10 p-1 gap-1 ${
        isOptimistic && "opacity-50"
      }`}
    >
      {confirm ? (
        <>
          <Input
            onChange={(e) =>
              setEditedValue({ ...editedValue, name: e.target.value })
            }
            value={editedValue.name}
          />
          <Input
            onChange={(e) =>
              setEditedValue({ ...editedValue, amount: e.target.value })
            }
            value={editedValue.amount}
          />
        </>
      ) : (
        <>
          <p className="flex items-center p-2 font-semibold text-primary">
            {savings.name}
          </p>
          <p className="flex items-center p-2 ">{usePhpPeso(savings.amount)}</p>
        </>
      )}
      <div className="flex flex-row gap-1 ml-auto mr-0">
        {deletePending || editPending ? (
          <div className="flex items-center justify-center w-10 h-10 text-2xl animate-spin">
            <FaSpinner />
          </div>
        ) : confirm ? (
          <>
            <Button onClick={() => editt()} size={"icon"}>
              <MdCheckCircle />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                setConfirm(false);
              }}
              size={"icon"}
            >
              <MdCancel />
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                setConfirm(true);
              }}
              variant={"outline"}
              size={"icon"}
            >
              <FaPencilAlt />
            </Button>
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
          </>
        )}
      </div>
      {/* {savings.expenses &&
        savings.expenses.map((expense: any[any]) => {
          return <p>{expense.name}</p>;
        })} */}
    </div>
  );
}
