import { NextResponse } from "next/server";
import { estimateRouter } from "~/server/api/routers/estimate";
import { createTRPCContext } from "~/server/api/trpc";

export const POST = async (req: Request) => {
  const input = await req.json();
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.create(input);
  return NextResponse.json(result);
};

export const GET = async (req: Request) => {
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.getAll();
  return NextResponse.json(result);
};
