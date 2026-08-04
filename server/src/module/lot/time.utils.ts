export function buildExpiryDate(nowDate: Date, days: number | string, time?: string) {
  const kyivNow = new Date(nowDate.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }));
  const offsetMs = nowDate.getTime() - kyivNow.getTime();

  const [hours, minutes] = (time || '21:00').split(':').map(Number);
  const targetDate = new Date(
    kyivNow.getFullYear(),
    kyivNow.getMonth(),
    kyivNow.getDate() + Number(days || 1),
    Number.isFinite(hours) ? hours : 21,
    Number.isFinite(minutes) ? minutes : 0,
    0,
    0,
  );

  return new Date(targetDate.getTime() - offsetMs);
}

export function buildRelistedDate(nowDate: Date, durationMs: number) {
  return new Date(nowDate.getTime() + durationMs);
}
