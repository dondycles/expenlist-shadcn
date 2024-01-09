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

export default function SavingsEachBar({ savings }: { savings: any }) {
  const [confirm, setConfirm] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: savings.name,
    amount: savings.amount,
  });

  const delete_ = async () => {
    setModifying(true);
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
    setModifying(true);

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
    setModifying(false);
  };

  return (
    <div
      key={savings.id}
      className="w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/10 p-2 gap-2"
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
      <div className="flex flex-row gap-2 ml-auto mr-0">
        {modifying ? (
          <div className="flex items-center justify-center w-10 h-10 text-2xl animate-spin">
            <FaSpinner />
          </div>
        ) : confirm ? (
          <>
            <Button onClick={edit_} size={"icon"}>
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
          </>
        )}
      </div>
      {savings.expenses &&
        savings.expenses.map((expense: any[any]) => {
          return <p>{expense.name}</p>;
        })}
    </div>
  );
}
