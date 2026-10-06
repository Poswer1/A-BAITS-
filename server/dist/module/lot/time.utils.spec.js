"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time.utils");
describe('time utils', () => {
    it('builds expiry date in Europe/Kyiv timezone', () => {
        const now = new Date('2024-01-01T10:00:00.000Z');
        const expiry = (0, time_utils_1.buildExpiryDate)(now, 1, '21:00');
        const parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Kyiv',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).formatToParts(expiry);
        const getPart = (type) => parts.find((part) => part.type === type)?.value;
        expect(`${getPart('year')}-${getPart('month')}-${getPart('day')}`).toBe('2024-01-02');
        expect(`${getPart('hour')}:${getPart('minute')}:${getPart('second')}`).toBe('21:00:00');
    });
    it('preserves the original duration when relisting a lot', () => {
        const now = new Date('2024-01-01T10:00:00.000Z');
        const durationMs = 36 * 60 * 60 * 1000;
        expect((0, time_utils_1.buildRelistedDate)(now, durationMs).getTime()).toBe(now.getTime() + durationMs);
    });
});
//# sourceMappingURL=time.utils.spec.js.map