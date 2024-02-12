import { cookies } from "next/headers";
import { getUser } from "@/auth";
import { redirect } from "next/navigation";
import Form from "./Form";

export default async function Signup() {
  let user: any;

  try {
    let tokenCookie = cookies().get("token")?.value;

    if (!tokenCookie) {
      throw new Error();
    }

    user = await getUser(tokenCookie);
  } catch (error) {
    console.log(error);
  }

  if (user) {
    redirect("/account");
  }

  return (
    <div className="grid place-items-center flex-grow">
      <main
        className="
          flex flex-col gap-6 
          p-8 
          border rounded-lg border-zinc-900 
          bg-zinc-950 
          w-[30rem]"
      >
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Sign up</h1>

          <p className="text-zinc-400">
            Sign up and your information will be stored.
          </p>
        </header>

        <Form />
      </main>
    </div>
  );
}
