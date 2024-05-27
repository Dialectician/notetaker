// app/page.tsx
import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { Sidebar } from "~/components/ui/sidebar";
import { Header } from "~/components/ui/header";
import { Card } from "~/components/ui/card"; // Import the Card component

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header session={session} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#d6cee0] to-[#15162c] p-8 text-white">
          <div className="container mx-auto flex flex-col items-center justify-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-bold">
                {hello ? hello.greeting : "Loading tRPC query..."}
              </p>
              <p className="mt-4 text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="mt-4 inline-block rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>

            <CrudShowcase />
          </div>
        </main>
      </div>
    </div>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <Card className="mt-8 w-full max-w-xs rounded-lg bg-white p-6 text-black shadow-md">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </Card>
  );
}
