"use client";
import SavingsTotal from "@/components/savings-total";
import SavingsBottomActionButtons from "@/components/savings-bottom-action-buttons";
import SavingsScrollable from "@/components/savings-scrollable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavings } from "@/actions/save/get";
import { useState } from "react";

export default function Savings() {
  var _ = require("lodash");

  const { data, isFetching } = useQuery({
    queryKey: ["savings"],
    queryFn: async () => getSavings(),
  });

  const total = _.sum(
    data && data.data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <SavingsScrollable savings={data?.data} />
      <SavingsBottomActionButtons>
        <SavingsTotal total={total} />
      </SavingsBottomActionButtons>
    </div>
  );
}
