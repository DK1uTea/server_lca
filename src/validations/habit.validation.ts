import z from "zod";
import { paginationSchema, searchSchema, sortSchema } from "./query.validation.js";

export const getHabitsSchema = z.object({
  query: z.object({
    ...paginationSchema.shape,
    ...sortSchema.shape,
    ...searchSchema.shape,
    frequency: z.string({
      message: "Frequency must be a string"
    }).optional(),
  }).strict()
})