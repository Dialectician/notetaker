import React from "react";
import Link from "next/link";

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 p-4 text-white">
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/estimates">Estimates</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
