import { TZDate } from '@date-fns/tz';
import {
  startOfWeek as fnsStartOfWeek,
  startOfMonth as fnsStartOfMonth,
  startOfDay as fnsStartOfDay,
  endOfDay as fnsEndOfDay,
  addWeeks,
  addMonths,
  format as fnsFormat
} from 'date-fns';

/**
 * Gets the start and end of a period (weekly/monthly) for a given timezone.
 */
export const getPeriodRange = (
  now: Date,
  period: 'weekly' | 'monthly',
  timezone: string = 'UTC'
) => {
  const zonedNow = new TZDate(now, timezone);

  let startDate: TZDate;
  let endDate: TZDate;

  if (period === 'monthly') {
    startDate = fnsStartOfMonth(zonedNow, { in: (date) => new TZDate(date as any, timezone) });
    endDate = addMonths(startDate, 1, { in: (date) => new TZDate(date as any, timezone) });
  } else {
    // default to weekly
    startDate = fnsStartOfWeek(zonedNow, { weekStartsOn: 1, in: (date) => new TZDate(date as any, timezone) });
    endDate = addWeeks(startDate, 1, { in: (date) => new TZDate(date as any, timezone) });
  }

  return { startDate, endDate };
};

/**
 * Gets the start of the day in a specific timezone.
 */
export const getZonedStartOfDay = (date: Date | string | number, timezone: string = 'UTC') => {
  const zonedDate = new TZDate(date as any, timezone);
  return fnsStartOfDay(zonedDate, { in: (d) => new TZDate(d as any, timezone) });
};

/**
 * Gets the end of the day in a specific timezone.
 */
export const getZonedEndOfDay = (date: Date | string | number, timezone: string = 'UTC') => {
  const zonedDate = new TZDate(date as any, timezone);
  return fnsEndOfDay(zonedDate, { in: (d) => new TZDate(d as any, timezone) });
};

/**
 * Formats a date string (or Date object) based on the provided timezone.
 * Useful for grouping stats by the user's local day.
 */
export const formatZonedDate = (
  date: Date | string | number,
  formatStr: string,
  timezone: string = 'UTC'
) => {
  const zonedDate = new TZDate(date as any, timezone);
  return fnsFormat(zonedDate, formatStr);
};
