import React from "react";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { fetchLatestPost } from "~/lib/trpc-utils";
import { Card } from "~/components/ui/card";

const CrudShowcase = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await fetchLatestPost();

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
};

export default CrudShowcase;
