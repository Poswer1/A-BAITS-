"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExpiryDate = buildExpiryDate;
exports.buildRelistedDate = buildRelistedDate;
const luxon_1 = require("luxon");
function buildExpiryDate(nowDate, days, time) {
    const [hours, minutes] = (time || '21:00').split(':').map(Number);
    const kyivNow = luxon_1.DateTime.fromJSDate(nowDate, { zone: 'Europe/Kyiv' });
    const targetDate = kyivNow
        .plus({ days: Number(days || 1) })
        .set({ hour: Number.isFinite(hours) ? hours : 21, minute: Number.isFinite(minutes) ? minutes : 0, second: 0, millisecond: 0 });
    return targetDate.toJSDate();
}
function buildRelistedDate(nowDate, durationMs) {
    return new Date(nowDate.getTime() + durationMs);
}
//# sourceMappingURL=time.utils.js.map