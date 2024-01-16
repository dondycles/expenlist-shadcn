"use client";

import { getMonthlyExpenses } from "@/actions/analysis/getMonthlyExpenses";
import { getMonthlySavings } from "@/actions/analysis/getMonthlySavings";
import { totalComputer } from "@/lib/totalComputer";
import { usePhpPeso } from "@/lib/phpformatter";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDailyExpenses } from "@/actions/analysis/getDailyExpenses";
import { colors } from "@/lib/colors";

export default function Analysis() {
  var _ = require("lodash");

  const [expensesState, setExpensesState] = useState<"monthly" | "thismonth">(
    "monthly"
  );

  const { data: monthly, isFetching: isMonthlyFetching } = useQuery({
    queryKey: ["expensesanalysis"],
    queryFn: async () => getMonthlyExpenses(),
    refetchOnWindowFocus: false,
  });

  const { data: thismonth, isFetching: isThisMonthFetching } = useQuery({
    queryKey: ["expensesanalysisdaily"],
    queryFn: async () => getDailyExpenses(),
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

  const monthlyExpenses = months.map((month, i) => ({
    month,
    total: totalComputer({
      data: monthly?.success[i],
      type: "expenses",
    }),
  }));

  const thisMonthsExpenses = thismonth?.success!.map((expense) => ({
    cost: Number(expense.cost),
    name: expense.name,
  }));

  return (
    <ScrollArea className="h-full">
      <div className="w-full h-full space-y-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-primary">
              <Select
                onValueChange={(e: "monthly" | "thismonth") =>
                  setExpensesState(e)
                }
              >
                <SelectTrigger defaultValue={"monthly"} className="w-full">
                  <SelectValue placeholder="This Year's Expenses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem defaultChecked value="monthly">
                      This Year's Expenses
                    </SelectItem>
                    <SelectItem value="thismonth">
                      This Month's Expenses
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expensesState === "monthly" ? (
              isMonthlyFetching ? (
                <p>Loading...</p>
              ) : (
                <ResponsiveContainer key={"monthly"} width="100%" height={350}>
                  <BarChart data={monthlyExpenses}>
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
                      dataKey="total"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary "
                    />
                  </BarChart>
                </ResponsiveContainer>
              )
            ) : null}
            {expensesState === "thismonth" ? (
              isThisMonthFetching ? (
                <p>Loading...</p>
              ) : (
                <ResponsiveContainer
                  key={"thismonth"}
                  width="100%"
                  height={350}
                >
                  <PieChart width={400} height={400}>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={thisMonthsExpenses}
                      cx="50%"
                      cy="50%"
                      fill="#000000"
                      dataKey="cost"
                      innerRadius={10}
                      isAnimationActive={false}
                    >
                      {thisMonthsExpenses?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )
            ) : null}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
