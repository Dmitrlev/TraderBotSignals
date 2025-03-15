import {getBinanceFuturesPrice, getBinanceSpotPrice} from "../../services/binanceApi.js";

export const getPrice = (coinSymbol) => Promise.all([
    getBinanceSpotPrice(coinSymbol),
    getBinanceFuturesPrice(coinSymbol),
]);