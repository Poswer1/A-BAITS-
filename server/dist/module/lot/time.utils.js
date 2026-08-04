"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExpiryDate = buildExpiryDate;
exports.buildRelistedDate = buildRelistedDate;
function buildExpiryDate(nowDate, days, time) {
    const [hours, minutes] = (time || '21:00').split(':').map(Number);
    const kyivNow = new Date(nowDate.toLocaleString('en-US', { timeZone: 'Europe/Kyiv' }));
    const targetDate = new Date(Date.UTC(kyivNow.getUTCFullYear(), kyivNow.getUTCMonth(), kyivNow.getUTCDate() + Number(days || 1), Number.isFinite(hours) ? hours : 21, Number.isFinite(minutes) ? minutes : 0, 0, 0));
    return new Date(targetDate.getTime() - (nowDate.getTimezoneOffset() * 60 * 1000));
}
function buildRelistedDate(nowDate, durationMs) {
    return new Date(nowDate.getTime() + durationMs);
}
//# sourceMappingURL=time.utils.js.map