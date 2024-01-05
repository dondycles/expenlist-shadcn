"use client";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { Button } from "./ui/button";
import { deleteExpense } from "@/actions/expense/delete";
import { useState } from "react";
import { Input } from "./ui/input";
import { editExpense } from "@/actions/expense/edit";
import { usePhpPeso } from "@/lib/phpformatter";

export default function ExpenseBar({ expense }: { expense: any }) {
  const [edit, setEdit] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: expense.name,
    cost: expense.cost,
  });
  const delete_ = async () => {
    const { error, success } = await deleteExpense(expense.id);
    console.log(error, success);
  };
  const edit_ = async () => {
    const { error, success } = await editExpense({
      cost: editedValue.cost,
      name: editedValue.name,
      id: expense.id,
    });

    console.log(error, success);
    if (error) return;

    setEdit(false);
  };
  return (
    <div
      key={expense.id}
      className="w-full rounded-[0.5rem] grid grid-cols-3 bg-primary/5 p-2"
    >
      {edit ? (
        <>
          <Input
            onChange={(e) =>
              setEditedValue({ ...editedValue, name: e.target.value })
            }
            value={editedValue.name}
          />
          <Input
            onChange={(e) =>
              setEditedValue({ ...editedValue, cost: e.target.value })
            }
            value={editedValue.cost}
          />
        </>
      ) : (
        <>
          <p className="flex items-center p-2 font-semibold text-primary">
            {expense.name}
          </p>
          <p className="flex items-center p-2 ">{usePhpPeso(expense.cost)}</p>
        </>
      )}

      <div className="flex flex-row gap-2 ml-auto mr-0">
        {edit ? (
          <>
            <Button onClick={edit_} size={"icon"}>
              <MdCheckCircle />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                setEdit(false);
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
                setEdit(true);
              }}
              variant={"outline"}
              size={"icon"}
            >
              <FaPencilAlt />
            </Button>
            <Button onClick={delete_} variant={"destructive"} size={"icon"}>
              <FaTrash />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
