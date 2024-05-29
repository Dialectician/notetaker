//src/server/api/root.ts
import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { topicRouter } from "./routers/topic";
import { estimateRouter } from "~/server/api/routers/estimate";
import { customerRouter } from "~/server/api/routers/customer"; // Import the customer router

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  topic: topicRouter,
  estimate: estimateRouter,
  customer: customerRouter, // Add the customer router to the appRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
