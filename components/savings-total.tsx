"use client";
import { getTotal } from "@/actions/getTotal";
import { usePhpPeso } from "@/lib/phpformatter";
import { useEffect, useState } from "react";
import { useTotal } from "@/store";
var _ = require("lodash");

export const revalidate = 0;

export default function SavingsTotal({ total }: { total: number }) {
  const setTtotal = useTotal().setTotal;

  useEffect(() => {
    setTtotal(Number(total));
  }, []);

  return (
    <div className="flex flex-row items-center flex-1 gap-2">
      <p className="text-primary-foreground">{usePhpPeso(total)}</p>
    </div>
  );
}
