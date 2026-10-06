import { DateTime } from 'luxon';

export function buildExpiryDate(nowDate: Date, days: number | string, time?: string) {
  const [hours, minutes] = (time || '21:00').split(':').map(Number);
  const kyivNow = DateTime.fromJSDate(nowDate, { zone: 'Europe/Kyiv' });

  const targetDate = kyivNow
    .plus({ days: Number(days || 1) })
    .set({ hour: Number.isFinite(hours) ? hours : 21, minute: Number.isFinite(minutes) ? minutes : 0, second: 0, millisecond: 0 });

  return targetDate.toJSDate();
}

export function buildRelistedDate(nowDate: Date, durationMs: number) {
  return new Date(nowDate.getTime() + durationMs);
}
