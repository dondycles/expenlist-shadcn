"use client";
import { useState } from "react";
import { AuthLogInForm } from "@/components/auth/auth-login-form";
import { AuthSignUpForm } from "@/components/auth/auth-signup-form";
import { FaPencilAlt } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, HomeIcon, LogIn } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const route = useRouter();
  return (
    <main className="flex flex-col w-full h-full  py-4 px-4 md:px-32 xl:px-64 2xl:px-[512px]">
      {/* <Tabs defaultValue="login" className="w-[400px] space-y-4 m-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <div className="w-full p-2 rounded-[0.5rem] text-6xl text-center text-white bg-primary flex items-center justify-center">
          <FaPencilAlt />
        </div>
        <p className="text-sm">
          Be smarter and start listing all of your expenses.{" "}
        </p>
        <TabsContent value="login">
          <AuthLogInForm />
        </TabsContent>
        <TabsContent value="signup">
          <AuthSignUpForm />
        </TabsContent>
      </Tabs> */}
      <div className="flex justify-between">
        <Button variant={"outline"} asChild className="w-fit">
          <Link href={"/"}>
            Home <Home className="w-4 h-4 ml-1" />
          </Link>
        </Button>
        {mode != "login" && (
          <Button
            variant={"outline"}
            onClick={() => setMode("login")}
            className="w-fit"
          >
            Log In <LogIn className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      <div className="max-w-[400px] m-auto space-y-2">
        <div className="flex items-center justify-center w-full text-6xl text-center text-primary">
          <FaPencilAlt />
        </div>
        <p className="text-2xl font-bold text-center text-primary">
          Expen//Save
        </p>
        <p className="text-sm">
          Be smarter and start listing all of your expenses.{" "}
        </p>
        <div className="flex flex-col gap-2">
          {mode === "login" && (
            <>
              <AuthLogInForm />
              <Button
                className="mx-auto"
                onClick={() => setMode("signup")}
                variant={"link"}
              >
                Don't have an account yet?
              </Button>
            </>
          )}
          {mode === "signup" && (
            <>
              <AuthSignUpForm />
              <p className="text-sm text-center opacity-50">
                By clicking Sign Up, you agree to our <br />{" "}
                <Link className="underline" href={"/"}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link className="underline" href={"/"}>
                  Privacy Policy
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
