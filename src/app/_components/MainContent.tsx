import Link from "next/link";
import { fetchHello } from "~/lib/trpc-utils";
import { getServerAuthSession } from "~/server/auth";

const MainContent = async () => {
  const hello = await fetchHello();
  const session = await getServerAuthSession();

  return (
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
  );
};

export default MainContent;
