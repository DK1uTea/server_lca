import z from "zod";
import { paginationSchema, searchSchema, sortSchema } from "./query.validation.js";

export const getTransactionsSchema = z.object({
  query: z.object({
    ...paginationSchema.shape,
    type: z.string({
      message: "Type must be a string"
    }).optional(),
    createdDate: z.string({
      message: "Created date must be a string"
    }).optional(),
  }).strict()
})

export const addTransactionSchema = z.object({
  body: z.object({
    type: z.enum(['income', 'expense'], {
      message: "Type must be income or expense"
    }),
    amount: z.number({
      message: "Amount must be a number"
    }).positive("Amount must be a positive number"),
    category: z.string({
      message: "Category must be a string"
    }),
    description: z.string({
      message: "Description must be a string"
    }).optional(),
  }).strict()
})