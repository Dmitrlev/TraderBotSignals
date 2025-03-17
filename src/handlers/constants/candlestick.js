import {SETTINGS} from "../../settings.js";

export const candlestickParams = (coinSymbol, interval, limit) => ({
    symbol: `${coinSymbol}USDT`,
    interval:  interval || SETTINGS.candlestick.interval,
    limit: limit || SETTINGS.candlestick.limit,
});