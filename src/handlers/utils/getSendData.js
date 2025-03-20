import {getCandlestickData} from "../../services/binanceApi.js";
import {candlestickParams} from "../constants/candlestick.js";
import {generateChartURL} from "../handleCoinPriceRequest/generateCandlestickChart.js";
import {formatCoinResponse} from "../handleCoinPriceRequest/formatResponse.js";
import {Markup} from "telegraf";
import {generateButtons} from "./generateButtons.js";

export const getSendData = async (coinSymbol, spotData, futuresData, changePriceSignal, interval = "15m", limit = 60) => {
    const resCandlestick = await getCandlestickData(candlestickParams(coinSymbol, interval, limit));
    const chartUrl = await generateChartURL(resCandlestick);
    const message = formatCoinResponse({ coinSymbol, spotData, futuresData, changePriceSignal });

    const buttons = Markup.inlineKeyboard([generateButtons(coinSymbol)]);

    return [chartUrl, message, buttons];
};