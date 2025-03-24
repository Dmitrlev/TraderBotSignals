import {getBinanceFuturesPrice, getBinanceSpotPrice} from "../../api/binanceApi.js";

export const getPrice = (coinSymbol) => Promise.all([
    getBinanceSpotPrice(coinSymbol),
    getBinanceFuturesPrice(coinSymbol),
]);