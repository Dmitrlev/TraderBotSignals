import {getCandlestickData} from "../../services/binanceApi.js";
import {candlestickParams} from "../constants/candlestick.js";
import {generateChartURL} from "../handleCoinPriceRequest/generateCandlestickChart.js";
import {formatCoinResponse} from "../handleCoinPriceRequest/formatResponse.js";
import {Markup} from "telegraf";
import {generateButtons} from "./generateButtons.js";

export const getSendData = async (coinSymbol, spotData, futuresData, changePriceSignal) => {
    const resCandlestick = await getCandlestickData(candlestickParams(coinSymbol));

    const chartUrl = await generateChartURL(resCandlestick);
    const message = formatCoinResponse({ coinSymbol, spotData, futuresData, changePriceSignal });
    const buttons = Markup.inlineKeyboard(
      [
        generateButtons(coinSymbol),
        [
          Markup.button.url(
            'Binance 🍌',
            `http://docs.prime-auto.by/?coin=${coinSymbol}USDT`
          )
        ]]
    );

    return [chartUrl, message, buttons];
}