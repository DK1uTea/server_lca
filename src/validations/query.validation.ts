import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.coerce
    .number({ message: 'Page must be a number' })
    .int('Page must be an integer')
    .min(1, 'Page must be at least 1')
    .optional()
    .default(1),
  limit: z.coerce
    .number({ message: 'Limit must be a number' })
    .int('Limit must be an integer')
    .min(1, 'Limit must be at least 1')
    .max(100, 'Limit cannot exceed 100')
    .optional()
    .default(10),
});

export const sortSchema = z.object({
  sort: z
    .enum(['asc', 'desc'], {
      message: "Sort must be either 'asc' or 'desc'",
    })
    .optional()
    .default('desc'),
  sortBy: z.string({ message: 'SortBy must be a string' }).optional(),
});

export const searchSchema = z.object({
  search: z.string({ message: 'Search must be a string' }).optional(),
});

export const getStatsSchema = z.object({
  query: z.object({
    period: z.enum(['weekly', 'monthly'], {
      message: "Period must be 'weekly' or 'monthly'",
    }).optional().default('weekly'),
  }).strict(),
});
