import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Home</h1>
    </main>
  );
}
