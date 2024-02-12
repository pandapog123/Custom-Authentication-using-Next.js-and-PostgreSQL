"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const signupStatus = useFormStatus();

  return (
    <button
      className="
        bg-white 
        text-black 
        p-2 
        rounded-md 
        transition 
        hover:opacity-80 
        disabled:bg-zinc-700 disabled:opacity-100
        focus:outline-2 focus:outline-sky-400 focus:outline-offset-2 focus:outline
        disabled:outline-none"
      tabIndex={-1}
      disabled={signupStatus.pending}
    >
      {signupStatus.pending ? "Loading" : "Sign up"}
    </button>
  );
}
