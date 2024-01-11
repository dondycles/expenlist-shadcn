"use client";
import SavingsTotal from "@/components/savings-total";
import SavingsBottomActionButtons from "@/components/savings-bottom-action-buttons";
import SavingsScrollable from "@/components/savings-scrollable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavings } from "@/actions/save/get";
import { useEffect, useState } from "react";

export default function Savings() {
  var _ = require("lodash");
  const [optimisticUpdate, setOptimisticUpdate] = useState();

  const { data, isFetching } = useQuery({
    queryKey: ["savings"],
    queryFn: async () => getSavings(),
    _optimisticResults: "optimistic",
  });

  const total = _.sum(
    data && data.data?.map((expense: { amount: any }) => Number(expense.amount))
  );

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto ">
      <SavingsScrollable
        optimisticUpdate={optimisticUpdate}
        savings={data?.data}
      />
      <SavingsBottomActionButtons
        setOptimistic={(variables) => setOptimisticUpdate(variables)}
      >
        <SavingsTotal total={total} />
      </SavingsBottomActionButtons>
    </div>
  );
}
