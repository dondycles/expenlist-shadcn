"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/actions/user/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const formSchema = z
  .object({
    username: z.string().min(8, {
      message: "Username must be at least 8 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    cpassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    path: ["cpassword"],
    message: "Password did not match.",
  });

export function AuthSignUpForm() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState<any | null>();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMessage(null);
    const { error } = await signUp(values);
    if (error) return setErrorMessage(error.message);

    setIsSuccessful(true);
    route.replace("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-2 max-w-[400px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cpassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type={!showPassword ? "password" : "text"}
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().password && (
          <Button
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            variant={"link"}
            className="w-full p-0 m-0 h-fit"
          >
            {!showPassword ? "hide" : "show"} password
          </Button>
        )}
        {errorMessage && (
          <p className="text-sm text-center text-destructive">{errorMessage}</p>
        )}
        <Button type="submit" className="w-full text-white shadow">
          {form.formState.isSubmitting ? (
            <div className=" animate-spin">
              <FaSpinner />
            </div>
          ) : isSuccessful ? (
            "Please wait..."
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
