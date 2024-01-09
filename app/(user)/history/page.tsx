import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePhpPeso } from "@/lib/phpformatter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
const supabase = createServerComponentClient({ cookies });
export default async function History({
  searchParams,
}: {
  searchParams: { range: string };
}) {
  const { data, error } = await supabase
    .from("history")
    .select("*,expenses(*), user_data(*), savings(*)")
    .order("created_at", { ascending: false })
    .range(
      Number(searchParams.range) > 0 ? Number(searchParams.range) - 10 : 0,
      searchParams.range ? Number(searchParams.range) : 10
    );
  console.log(
    Number(searchParams.range) > 0 ? Number(searchParams.range) - 10 : 0,
    searchParams.range ? Number(searchParams.range) : 10
  );
  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto">
      <Table className="text-xs sm:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cost/Amount</TableHead>
            <TableHead>Deducted To</TableHead>
            <TableHead>Total Savings</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((history) => {
            return (
              <TableRow
                id={history.id}
                // className={`
                // ${history.is_deleted && "bg-destructive/25"}
                // ${history.is_edit && "bg-secondary/25"}
                // ${!history.is_edit && !history.is_deleted && "bg-primary/25"}
                // `}
              >
                <TableCell
                  className={` ${
                    history.is_expense ? "text-destructive" : "text-primary"
                  }`}
                >
                  {history.name}
                </TableCell>
                <TableCell>{usePhpPeso(history.amount)}</TableCell>
                <TableCell>
                  {/* {(history.is_deleted && "Delete") ||
                    (history.is_edit && "Edited") ||
                    "Added"} */}
                  {history.is_expense &&
                    history.savings &&
                    history.savings.name +
                      "-" +
                      usePhpPeso(history.savings.amount)}
                </TableCell>
                <TableCell>
                  {usePhpPeso(history.savings_overall_total)}
                </TableCell>
                <TableCell
                  className={`flex items-center justify-center ${
                    (history.is_deleted && "text-destructive") ||
                    (history.is_edit && "text-secondary") ||
                    "text-primary"
                  }`}
                >
                  {(history.is_deleted && <FaTrash />) ||
                    (history.is_edit && <FaPencilAlt />) || <FaPlus />}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between gap-2 mt-auto mb-0">
        {Number(searchParams.range) > 10 && (
          <Button asChild>
            <Link
              href={`/history?range=${
                Number(searchParams.range) === 10 ||
                Number(searchParams.range) === 0 ||
                !searchParams.range
                  ? "10"
                  : String(Number(searchParams.range) - 10)
              }`}
            >
              -10
            </Link>
          </Button>
        )}
        <p>Last 10 History</p>
        <Button asChild>
          <Link
            href={`
              /history?range=${
                searchParams.range
                  ? String(Number(searchParams.range) + 10)
                  : "20"
              }
            `}
          >
            +10
          </Link>
        </Button>
      </div>
    </div>
  );
}
