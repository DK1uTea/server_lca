import z from "zod";
import { paginationSchema, searchSchema, sortSchema } from "./query.validation.js";

export const getTasksSchema = z.object({
  query: z.object({
    ...paginationSchema.shape,
    ...sortSchema.shape,
    ...searchSchema.shape,
    priority: z.string({
      message: "Priority must be a string"
    }).optional(),
    status: z.string({
      message: "Status must be a string"
    }).optional(),
  }).strict()
})