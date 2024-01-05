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
import { logIn } from "@/actions/user/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Please input your username.",
  }),
  password: z.string().min(1, {
    message: "Please input your password.",
  }),
});

export function AuthLogInForm() {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error, success } = await logIn(values);

    if (error) return console.log(error);

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
        {form.getValues().password && (
          <Button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            variant={"link"}
            className="w-full p-0 m-0 h-fit"
          >
            {!showPassword ? "hide" : "show"} password
          </Button>
        )}
        <Button type="submit" className="w-full text-white shadow">
          {form.formState.isSubmitting ? (
            <div className=" animate-spin">
              <FaSpinner />
            </div>
          ) : isSuccessful ? (
            "Please wait..."
          ) : (
            "Log In"
          )}
        </Button>
      </form>
    </Form>
  );
}
