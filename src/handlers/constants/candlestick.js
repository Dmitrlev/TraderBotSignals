import {SETTINGS} from "../../settings.js";

export const candlestickParams = (coinSymbol) => ({
    symbol: `${coinSymbol}USDT`,
    interval: SETTINGS.candlestick.interval,
    limit: SETTINGS.candlestick.limit,
});