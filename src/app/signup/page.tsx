import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Signup() {
  async function signupAction(formData: FormData) {
    "use server";

    try {
      const result = signupSchema.parse(Object.fromEntries(formData));
    } catch (error) {
      return {
        test: "test",
      };
    }

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

          <Test />
        </header>

        <form
          action={signupAction}
          method="post"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="bg-zinc-900 border border-zinc-800 p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="bg-zinc-900 border border-zinc-800 p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="bg-zinc-900 border border-zinc-800 p-2 rounded"
            />
          </div>

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
            Sign up
          </button>
        </form>
      </main>
    </div>
  );
}
