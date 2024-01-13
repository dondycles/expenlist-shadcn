"use client";

import { getMonthlyExpenses } from "@/actions/analysis/getMonthlyExpenses";
import { getMonthlySavings } from "@/actions/analysis/getMonthlySavings";
import { totalComputer } from "@/lib/totalComputer";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDailyExpenses } from "@/actions/analysis/getDailyExpenses";

export default function Analysis() {
  var _ = require("lodash");

  const [expensesState, setExpensesState] = useState<"monthly" | "daily">(
    "monthly"
  );

  const { data: expenses } = useQuery({
    queryKey: ["expensesanalysis"],
    queryFn: async () => getMonthlyExpenses(),
    refetchOnWindowFocus: false,
  });

  const { data: dailyexpenses } = useQuery({
    queryKey: ["expensesanalysisdaily"],
    queryFn: async () => getDailyExpenses(),
    refetchOnWindowFocus: false,
  });

  const { data: savings } = useQuery({
    queryKey: ["savingsanalysis"],
    queryFn: async () => getMonthlySavings(),
    refetchOnWindowFocus: false,
  });

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const eachMonthExpenses = months.map((month, i) => ({
    month,
    avg: totalComputer({
      data: expenses?.success[i],
      type: "expenses",
    }),
  }));

  const eachMonthSavings = months.map((month, i) => ({
    month,
    avg: totalComputer({
      data: savings?.success[i],
      type: "savings",
    }),
  }));
  const dailyExpense = dailyexpenses?.success!.map((expense) => expense);
  return (
    <ScrollArea className="h-full">
      <div className="w-full h-full space-y-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-primary">
              <Select
                onValueChange={(e: "monthly" | "daily") => setExpensesState(e)}
              >
                <SelectTrigger defaultValue={"daily"} className="w-[180px]">
                  <SelectValue placeholder="Monthly Expenses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem defaultChecked value="monthly">
                      Monthly Expenses
                    </SelectItem>
                    <SelectItem value="daily">Daily Expenses</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expensesState === "monthly" && (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={eachMonthExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={{ color: "#000000" }} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${usePhpPeso(value)}`}
                  />
                  <Bar
                    dataKey="avg"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary "
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {expensesState === "daily" && (
              <ResponsiveContainer key={"savings"} width="100%" height={350}>
                <BarChart data={dailyExpense}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={{ color: "#000000" }} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${usePhpPeso(value)}`}
                  />
                  <Bar
                    dataKey="cost"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
