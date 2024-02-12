"use server";
import { createUser } from "@/auth";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";
import { ZodError } from "zod";

export async function signupAction(_: any, formData: FormData) {
  try {
    const result = await createUser(formData);

    cookies().set("token", result);
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: error.errors[0].message,
      };
    }

    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }

    return {
      error: "Unknown error occured while signing up",
    };
  }

  redirect("/account");
}
