import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import Image from "next/image"; // Import Image from next/image

interface HeaderProps {
  session: { [key: string]: any }; // Update the session type
}

export function Header({ session }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-[#15162c] p-4 text-white shadow-lg">
      <div className="text-xl font-bold">
        <Link href="/">
          {/* Replace img tag with Image component */}
          <Image
            src="/logo.png"
            alt="Track162 Logo"
            width={32}
            height={32}
            className="mr-2 inline-block"
          />
          Track162
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
        <button className="ml-4">
          <Sun className="h-6 w-6" />
          <Moon className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
}
