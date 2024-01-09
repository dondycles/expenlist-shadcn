"use server";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import prisma from "@/prisma/client";
import { FieldValues } from "react-hook-form";

export const signUp = async (user: FieldValues) => {
  const email = String(user.username + "@gmail.com");
  const password = String(user.password);
  const supabase = createServerActionClient({ cookies });
  // const session = await supabase.auth.getSession();

  // if (session.data.session?.user)
  //   return { error: "You are already logged in!" };

  // if (password != confirmpassword) return { error: "Password Did Not Match!" };

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error: error };

  const userData = await supabase.from("user_data").insert([
    {
      user_name: user.username,
    },
  ]);

  if (userData.error) return { error: userData.error };

  return { success: data };
};
