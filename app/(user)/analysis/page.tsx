"use client";

import { getMonthlyExpenses } from "@/actions/analysis/getMonthlyExpenses";
import { usePhpPeso } from "@/lib/phpformatter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Analysis() {
  var _ = require("lodash");
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["analysis"],
    queryFn: async () => getMonthlyExpenses(),
    refetchOnWindowFocus: false,
  });

  const averageComputer = (data: any[] | null | undefined) => {
    if (data === undefined) return 0;
    if (!data) return 0;
    const total = _.sum(data?.map((d: { cost: any }) => Number(d.cost)));
    const average = total / data?.length;

    return average;
  };

  const eachMonth = [
    { month: "Jan", avg: averageComputer(data?.success.jan) },
    { month: "Feb", avg: averageComputer(data?.success.feb) },
    { month: "Mar", avg: averageComputer(data?.success.mar) },
    { month: "Apr", avg: averageComputer(data?.success.apr) },
    { month: "May", avg: averageComputer(data?.success.may) },
    { month: "Jun", avg: averageComputer(data?.success.jun) },
    { month: "Jul", avg: averageComputer(data?.success.jul) },
    { month: "Aug", avg: averageComputer(data?.success.aug) },
    { month: "Sep", avg: averageComputer(data?.success.sep) },
    { month: "Oct", avg: averageComputer(data?.success.oct) },
    { month: "Nov", avg: averageComputer(data?.success.nov) },
    { month: "Dec", avg: averageComputer(data?.success.dec) },
  ];

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={eachMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${usePhpPeso(value)}`}
          />
          <Bar
            dataKey="avg"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
