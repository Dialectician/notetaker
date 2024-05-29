//src/app/api/estimates/route.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const estimateRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
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
      }),
    )
    .mutation(async ({ input }) => {
      const estimate = await db.estimate.create({
        data: {
          customerId: input.customerId,
          notes: input.notes,
          terms: input.terms,
          discount: input.discount,
          taxRate: input.taxRate,
          totalCost: input.totalCost,
          items: {
            create: input.items,
          },
        },
      });
      return estimate;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const estimates = await db.estimate.findMany({
      where: { customerId: ctx.session.user.id },
      include: { items: true },
    });
    return estimates;
  }),
});
