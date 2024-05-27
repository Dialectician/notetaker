"use client";

import Link from "next/link";
import { Home, User, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#1e1e2e] p-4 text-white shadow-lg">
      <nav className="flex flex-col gap-4">
        {/* navigate to dashboard src/app/dashboard */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:underline"
        >
          <Home className="h-5 w-5" /> Dashboard
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 hover:underline"
        >
          <User className="h-5 w-5" /> Profile
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 hover:underline"
        >
          <Settings className="h-5 w-5" /> Settings
        </Link>
      </nav>
    </aside>
  );
}
