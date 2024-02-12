import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col p-4 justify-between h-screen bg-black text-white">
          {children}

          <section className="flex gap-4">
            <Link
              href="/"
              className="
                px-3 py-1
                border rounded-md border-zinc-900
                bg-zinc-950
                transition
                hover:bg-zinc-900"
            >
              Home
            </Link>

            <Link
              href="/signup"
              className="
                px-3 py-1
                border rounded-md border-zinc-900
                bg-zinc-950
                transition
                hover:bg-zinc-900"
            >
              Sign up
            </Link>

            <Link
              href="/login"
              className="
                px-3 py-1
                border rounded-md border-zinc-900
                bg-zinc-950
                transition
                hover:bg-zinc-900"
            >
              Log in
            </Link>

            <Link
              href="/account"
              className="
                px-3 py-1
                border rounded-md border-zinc-900
                bg-zinc-950
                transition
                hover:bg-zinc-900"
            >
              Account
            </Link>
          </section>
        </div>
      </body>
    </html>
  );
}
