"use client";
import { usePhpPeso } from "@/lib/phpformatter";
var _ = require("lodash");

export default function ExpenseTotal({ total }: { total: number }) {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-primary-foreground">{usePhpPeso(total)}</p>
    </div>
  );
}
