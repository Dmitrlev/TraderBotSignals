import {getBinanceFuturesPrice, getBinanceSpotPrice} from "../../services/binanceApi.js";

export const getPrice = (coinSymbol: string) => Promise.all([
    getBinanceSpotPrice(coinSymbol),
    getBinanceFuturesPrice(coinSymbol),
]);