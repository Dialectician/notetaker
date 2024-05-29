import React from "react";
import { Sidebar } from "~/components/ui/sidebar";
import { Header } from "~/components/ui/header";
import { getServerAuthSession } from "~/server/auth";

const EstimatesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header session={session} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col p-8">{children}</main>
      </div>
    </div>
  );
};

export default EstimatesLayout;
