"use client";
import { FaPencilAlt, FaSpinner, FaTrash } from "react-icons/fa";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { Button } from "./ui/button";
import { deleteExpense } from "@/actions/expense/delete";
import { useState } from "react";
import { Input } from "./ui/input";
import { editExpense } from "@/actions/expense/edit";
import { usePhpPeso } from "@/lib/phpformatter";

export default function ExpenseBar({ expense }: { expense: any }) {
  const [modification, setModification] = useState<"edit" | "delete" | null>(
    null
  );
  const [confirm, setConfirm] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: expense.name,
    cost: expense.cost,
  });
  const delete_ = async () => {
    const { error, success } = await deleteExpense(expense.id);
    console.log(error, success);

    if (error) return { error };
    return { success };
  };
  const edit_ = async () => {
    if (
      editedValue.cost === expense.cost &&
      editedValue.name === expense.name
    ) {
      setConfirm(false);
      setModification(null);
      return { success: "Nothing Changed." };
    }

    const { error, success } = await editExpense({
      cost: editedValue.cost === expense.cost ? expense.cost : editedValue.cost,
      name: editedValue.name === expense.name ? expense.name : editedValue.name,
      id: expense.id,
    });

    console.log(error, success);
    if (error) return { error };

    setConfirm(false);
    setModification(null);

    return { success };
  };

  const modify = async () => {
    setModifying(true);
    if (modification === "delete") {
      const { error, success } = await delete_();
      if (error) setModifying(false);
    }
    if (modification === "edit") {
      const { error, success } = await edit_();
      if (error) setModifying(false);
    }
  };
  return (
    <div
      key={expense.id}
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
        {modifying ? (
          <div className="flex items-center justify-center h-full text-3xl animate-spin w-fit">
            <FaSpinner />
          </div>
        ) : confirm ? (
          <>
            <Button onClick={modify} size={"icon"}>
              <MdCheckCircle />
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                setConfirm(false);
                setModification(null);
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
                setModification("edit");
                setConfirm(true);
              }}
              variant={"outline"}
              size={"icon"}
            >
              <FaPencilAlt />
            </Button>
            <Button
              onClick={() => {
                setModification("delete");
                setConfirm(true);
              }}
              variant={"destructive"}
              size={"icon"}
            >
              <FaTrash />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
