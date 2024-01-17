"use client";

import { getMonthlyExpenses } from "@/actions/analysis/getMonthlyExpenses";
import { totalComputer } from "@/lib/totalComputer";
import { usePhpPeso } from "@/lib/phpformatter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDailyExpenses } from "@/actions/analysis/getDailyExpenses";
import { toPhDate } from "@/lib/phdate";
import { daysInEachMonth } from "@/lib/monthsdayscounter";
import { FaSpinner } from "react-icons/fa";

export default function Analysis() {
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

  const [expensesState, setExpensesState] = useState<"monthly" | "thismonth">(
    "monthly"
  );

  const { data: monthly, isFetching: isMonthlyFetching } = useQuery({
    queryKey: ["expensesanalysis"],
    queryFn: async () => getMonthlyExpenses(),
    refetchOnWindowFocus: false,
  });

  const monthlyExpenses = months.map((month, i) => ({
    month,
    total: totalComputer({
      data: monthly?.success[i],
      type: "expenses",
    }),
  }));

  const { data: thismonth, isFetching: isThisMonthFetching } = useQuery({
    queryKey: ["expensesanalysisdaily"],
    queryFn: async () => getDailyExpenses(),
    refetchOnWindowFocus: false,
  });

  const dailyExpenses = () => {
    const daysInMonth = Array.from(
      { length: Number(daysInEachMonth(new Date(toPhDate())).days) },
      (_, index) => index + 1
    );

    const dailyExpenses: any[any] = {};

    daysInMonth.forEach((day, i) => {
      const date = `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      dailyExpenses[date] = { total: 0, name: date, date, day: i + 1 };
    });

    thismonth?.success!.map((expense) => {
      const date = expense.date;
      const cost = Number(expense.cost);

      if (dailyExpenses[date]) {
        dailyExpenses[date].total += cost;
      }
    });

    return dailyExpenses;
  };

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
                <div className="flex flex-row gap-2">
                  <p>Calculating</p>
                  <div className="animate-spin w-fit h-fit">
                    <FaSpinner />
                  </div>
                </div>
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
                <div className="flex flex-row gap-2">
                  <p>Calculating</p>
                  <div className="animate-spin w-fit h-fit">
                    <FaSpinner />
                  </div>
                </div>
              ) : (
                <ResponsiveContainer key={"monthly"} width="100%" height={350}>
                  <BarChart data={Object.values(dailyExpenses())}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
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
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
