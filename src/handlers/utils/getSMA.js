/**
 * Функция расчета скользящей средней (SMA)
 * @param {Array} candles - массив свечей [{ x, o, h, l, c }]
 * @param {number} period - период SMA
 * @returns {Array} массив точек SMA [{ x, y }]
 */
export const getSMA = (candles, period) => {
    return candles.map((c, i, arr) => {
        if (i < period - 1) return null;
        const slice = arr.slice(i - period + 1, i + 1);
        const avg = slice.reduce((sum, val) => sum + val.c, 0) / period;
        return { x: c.x, y: avg };
    }).filter(v => v !== null);
}