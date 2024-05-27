import { api } from "~/trpc/server";

export async function fetchHello() {
  return await api.post.hello({ text: "from tRPC" });
}

export async function fetchLatestPost() {
  return await api.post.getLatest();
}
