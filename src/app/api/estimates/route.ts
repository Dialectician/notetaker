import { NextResponse } from "next/server";
import { z } from "zod";
import { estimateRouter } from "~/server/api/routers/estimate";
import { createTRPCContext } from "~/server/api/trpc";

// Define the input schema outside of the handler to reuse it
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

type Input = z.infer<typeof schema>;

export const POST = async (req: Request) => {
  try {
    // Parse and validate the input
    const input: unknown = await req.json();
    const parsedInput: Input = schema.parse(input);

    // Create the TRPC context
    const ctx = await createTRPCContext({ headers: req.headers });
    const caller = estimateRouter.createCaller(ctx);

    // Call the create method on the router
    const result = await caller.create(parsedInput);
    return NextResponse.json(result);
  } catch (error: unknown) {
    // Handle the error correctly
    let errorMessage = "An error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
};

export const GET = async (req: Request) => {
  const ctx = await createTRPCContext({ headers: req.headers });
  const caller = estimateRouter.createCaller(ctx);
  const result = await caller.getAll();
  return NextResponse.json(result);
};
