"use client";
import { useState } from "react";
import { AuthLogInForm } from "@/components/auth-login-form";
import { AuthSignUpForm } from "@/components/auth-signup-form";
import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";

export default function Auth() {
  const [mode, setMode] = useState<"signup" | "login">("login");
  return (
    <main className="flex w-full h-full p-4">
      <div className="max-w-[300px] w-full m-auto flex flex-col gap-2 border-border border-[1px] p-4 rounded-[0.5rem] shadow">
        <div className="w-full p-2 rounded-[0.5rem] text-6xl text-center text-white bg-primary flex items-center justify-center">
          <FaPencilAlt />
        </div>
        <p>Be smarter and start listing all of your expenses. </p>
        {mode === "login" ? <AuthLogInForm /> : <AuthSignUpForm />}
        <Button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
          }}
          className="w-full p-0 m-0 h-fit"
          variant={"link"}
        >
          or {mode === "login" ? "Sign Up" : "Log In"}
        </Button>
      </div>
    </main>
  );
}
