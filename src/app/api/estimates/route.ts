import { NextResponse } from "next/server";
import { z } from "zod";
import { estimateRouter } from "~/server/api/routers/estimate";
import { createTRPCContext } from "~/server/api/trpc";

export const POST = async (req: Request) => {
  // Parse and validate the input
  const input = await req.json().catch(() => {
    throw new Error("Invalid JSON payload");
  });

  // Define the input schema
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

  // Validate the input
  const parsedInput = schema.parse(input);

  // Create the TRPC context
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);

  // Call the create method on the router
  const result = await caller.create(parsedInput);
  return NextResponse.json(result);
};

export const GET = async (req: Request) => {
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.getAll();
  return NextResponse.json(result);
};
