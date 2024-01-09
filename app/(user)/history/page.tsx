import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import HistoryEachBar from "@/components/history-each-bar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePhpPeso } from "@/lib/phpformatter";
const supabase = createServerComponentClient({ cookies });
export default async function History() {
  const { data, error } = await supabase
    .from("history")
    .select("*,expenses(*), user_data(*), savings(*)")
    .order("created_at", { ascending: false });

  return (
    <div className="flex flex-col w-full h-full max-h-full gap-2 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cost/Amount</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((history) => {
            return (
              <TableRow id={history.id}>
                <TableCell>{history.name}</TableCell>
                <TableCell>{usePhpPeso(history.amount)}</TableCell>
                <TableCell>
                  {(history.is_deleted && "Delete") ||
                    (history.is_edit && "Edited") ||
                    "Added"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
