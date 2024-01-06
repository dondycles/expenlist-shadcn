"use client";
import { FaPencilAlt, FaSpinner, FaTrash } from "react-icons/fa";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { editSavings } from "@/actions/save/edit";
import { usePhpPeso } from "@/lib/phpformatter";
import { deleteSavings } from "@/actions/save/delete";

export default function SavingsEachBar({ savings }: { savings: any }) {
  const [modification, setModification] = useState<"edit" | "delete" | null>(
    null
  );
  const [confirm, setConfirm] = useState(false);
  const [modifying, setModifying] = useState(false);
  const [editedValue, setEditedValue] = useState({
    name: savings.name,
    amount: savings.amount,
  });
  const delete_ = async () => {
    const { error, success } = await deleteSavings(savings.id);
    console.log(error, success);

    if (error) return { error };
    return { success };
  };
  const edit_ = async () => {
    if (
      editedValue.amount === savings.amount &&
      editedValue.name === savings.name
    ) {
      setConfirm(false);
      setModification(null);
      return { success: "Nothing Changed." };
    }

    const { error, success } = await editSavings({
      amount:
        editedValue.amount === savings.amount
          ? savings.amount
          : editedValue.amount,
      name: editedValue.name === savings.name ? savings.name : editedValue.name,
      id: savings.id,
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
      console.log(error, success);
      if (error) setModifying(false);
    }
    if (modification === "edit") {
      const { error, success } = await edit_();
      console.log(error, success);
      setModifying(false);
    }
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
      {savings.expenses.map((expense: any[any]) => {
        return <p>{expense.name}</p>;
      })}
    </div>
  );
}
