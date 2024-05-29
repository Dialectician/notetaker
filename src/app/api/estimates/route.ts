import { NextResponse } from "next/server";
import { z } from "zod";
import { estimateRouter } from "~/server/api/routers/estimate";
import { createTRPCContext } from "~/server/api/trpc";

export const POST = async (req: Request) => {
  const input = await req.json().catch((error: unknown) => {
    throw new Error("Invalid JSON payload");
  });

  // Ensure the input matches the expected type
  const schema = z.object({
    customerId: z.string(),
    items: z.array(
      z.object({
        description: z.string(),
        quantity: z.number(),
        unitPrice: z.number(),
      }),
    ),
    notes: z.string().optional(),
    terms: z.string().optional(),
    discount: z.number().default(0),
    taxRate: z.number().default(0),
    totalCost: z.number(),
  });

  const parsedInput = schema.parse(input);

  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.create(parsedInput);
  return NextResponse.json(result);
};

export const GET = async (req: Request) => {
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.getAll();
  return NextResponse.json(result);
};
