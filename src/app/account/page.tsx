import { getUser } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserProp() {
  try {
    let tokenCookie = cookies().get("token")?.value;

    if (!tokenCookie) {
      throw new Error();
    }

    return await getUser(tokenCookie);
  } catch (error) {
    redirect("/signup");
  }
}

export default async function Account() {
  const user = await getUserProp();

  async function logout() {
    "use server";
    cookies().delete("token");
    redirect("/signup");
  }

  return (
    <div className="grid place-items-center flex-grow">
      <main
        className="
          flex flex-col gap-6 
          p-8 
          border rounded-lg border-zinc-900 
          bg-zinc-950 
          min-w-[30rem]"
      >
        <h1 className="text-2xl font-bold">Welcome back, {user.name}</h1>

        <pre>{JSON.stringify(user, null, 4)}</pre>

        <form className="flex flex-col gap-6" action={logout}>
          <button
            className="
              bg-white 
              text-black 
              p-2 
              rounded-md 
              transition 
              hover:opacity-80 
              focus:outline-2 focus:outline-sky-400 focus:outline-offset-2 focus:outline"
            tabIndex={-1}
          >
            Log out
          </button>
        </form>
      </main>
    </div>
  );
}
