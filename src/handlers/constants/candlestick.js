import {SETTINGS} from "../../settings.js";

export const candlestickParams = (coinSymbol, interval, limit) => ({
    symbol: `${coinSymbol}USDT`,
    interval:  SETTINGS.candlestick.interval,
    limit: SETTINGS.candlestick.limit,
});