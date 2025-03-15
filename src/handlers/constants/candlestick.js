export const candlestickParams = (coinSymbol) => ({
    symbol: `${coinSymbol}USDT`,
    interval: "5m",
    limit: 60,
});