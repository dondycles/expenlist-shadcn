import { Button } from "@/components/ui/button";
import { History, Plus, Minus, ArrowUpDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      name: "History",
      desc: "Automatic history for any movements of your money.",
      icon: <History className="w-10 h-10" />,
    },
    {
      name: "Analysis",
      desc: "Keep track of your  monthly, and yearly average money spent or saved.",
      icon: <ArrowUpDown className="w-10 h-10" />,
    },
    {
      name: "Savings",
      desc: "Listing of your savings.",
      icon: <Plus className="w-10 h-10" />,
    },
    {
      name: "Expenses",
      desc: "Listing of your savings that you can optionally deduct to your savings.",
      icon: <Minus className="w-10 h-10" />,
    },
  ];

  return (
    <main className="w-full h-full max-h-full overflow-auto py-4 px-4 md:px-32 xl:px-64 2xl:px-[512px]">
      <div className="w-full pt-32 space-y-4 text-center">
        <p className="text-4xl font-extrabold sm:text-6xl text-primary">
          Expen//Save.
        </p>
        <p className="text-xl font-bold">
          Your Financial Companion for Expenses and Savings.
        </p>
      </div>
      <div className="w-full pt-8 text-center">
        <p className="">
          Simplify your finances with ease. Track expenses, set savings, and
          gain insights into your spending habits.
        </p>
      </div>
      <div className="w-full pt-8 space-x-2 text-center">
        <Button asChild>
          <Link href={"/auth"}>Get Started</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link
            target="_blank"
            href={"https://github.com/dondycles/expensave-shadcn"}
          >
            GitHub
          </Link>
        </Button>
      </div>
      <div className="w-full p-4 mt-32 bg-primary/5 rounded-[0.5rem] ">
        <p className="text-xl font-bold text-center sm:text-3xl text-primary">
          Features
        </p>
        <p className="text-center">
          These are the features provided to you to be smarter with your
          expenses and savings.
        </p>
        <div className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-2">
          {features.map((f) => {
            return (
              <div
                className="border  rounded-[0.5rem] px-2 py-4 flex flex-col gap-2 h-full"
                key={f.name}
              >
                <div className="mx-auto text-4xl text-center text-primary">
                  {f.icon}
                </div>
                <p className="text-xl font-bold text-center text-primary">
                  {f.name}
                </p>
                <p className="text-center">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      <footer className="mt-32">
        <p className="text-sm">
          Built with NextJS, Supabase, TanStack Query, shadcn/ui, TailwindCSS,
          and Zod.
        </p>
      </footer>
    </main>
  );
}
