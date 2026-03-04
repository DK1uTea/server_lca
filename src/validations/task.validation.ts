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

export const addTaskSchema = z.object({
  body: z.object({
    title: z.string({
      message: "Title must be a string"
    }),
    description: z.string({
      message: "Description must be a string"
    }).optional(),
    dueDate: z.preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        const date = new Date(arg);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
      return undefined;
    }, z.date({
      message: "Due date must be a valid date"
    })).optional(),
    priority: z.enum(["low", "medium", "high"], {
      message: "Priority must be one of 'low', 'medium', or 'high'"
    }).optional(),
  }).strict()
})