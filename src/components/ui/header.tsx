import type { Session } from "next-auth";
import Image from "next/image";

interface HeaderProps {
  session: Session | null;
}

export const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="flex items-center">
        <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
        <h1 className="ml-2 text-xl font-bold">My App</h1>
      </div>
      <nav>
        {session ? (
          <span>Logged in as {session.user?.name}</span>
        ) : (
          <a href="/api/auth/signin" className="text-white">
            Sign in
          </a>
        )}
      </nav>
    </header>
  );
};
