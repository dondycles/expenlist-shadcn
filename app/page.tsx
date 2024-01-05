import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex w-full h-full max-h-full p-4 overflow-auto">
      <div className="flex flex-col gap-2 max-w-[300px] max-h-[200px] h-full w-full m-auto">
        <div className="flex flex-row gap-2">
          <div className="flex flex-col flex-1">
            <p className="text-3xl font-extrabold text-primary">ExpenSave.</p>
            <p>Keep track of your expenses to save more.</p>
          </div>
          <div className="text-4xl text-white rounded-[0.5rem] aspect-square h-full w-fit bg-primary flex items-center justify-center">
            <FaPencilAlt />
          </div>
        </div>
        <div>
          <Button asChild className="w-full">
            <Link
              className="font-extrabold text-primary-foreground "
              href={"/auth"}
            >
              Get Started
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
