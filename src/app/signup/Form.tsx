"use client";

import { useFormState } from "react-dom";
import { signupAction } from "./actions";
import SubmitButton from "./SubmitButton";

export default function Form() {
  const [state, action] = useFormState(signupAction, {
    error: "",
  });

  return (
    <form action={action} className="flex flex-col gap-4">
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

      {state.error !== "" ? (
        <p className="text-rose-500 text-sm">{state.error}</p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
