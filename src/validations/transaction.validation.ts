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