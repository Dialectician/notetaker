import { getServerAuthSession } from "~/server/auth";
import { Sidebar } from "~/components/ui/sidebar";
import { Header } from "~/components/ui/header";
import MainContent from "~/app/_components/MainContent";
import CrudShowcase from "~/app/_components/CrudShowcase";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header session={session} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#d6cee0] to-[#15162c] p-8 text-white">
          <div className="container mx-auto flex flex-col items-center justify-center gap-12">
            <MainContent />
            <CrudShowcase />
          </div>
        </main>
      </div>
    </div>
  );
}
