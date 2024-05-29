import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const customerRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.customer.findMany();
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return ctx.db.customer.findUnique({ where: { id: input } });
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        contactInfo: z.string(),
        address: z.string(),
        billingPreferences: z.string(),
        specialInstructions: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.db.customer.create({ data: input });
    }),
});
