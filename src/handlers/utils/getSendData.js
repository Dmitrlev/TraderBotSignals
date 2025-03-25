import {formatCoinResponse} from "../handleCoinPriceRequest/formatResponse.js";
import {getCandlestickData} from "../../api/binanceApi.js";
import {candlestickParams} from "../constants/candlestick.js";
import {generateChartURL} from "../handleCoinPriceRequest/generateCandlestickChart.js";
import {generateButtons} from "./generateButtons.js";
import {Markup} from "telegraf";

export const getSendData = async (
  coinSymbol,
  spotData,
  futuresData,
  changePriceSignal,
  interval = "15m",
  limit = 60,
) => {

  const resCandlestick = await getCandlestickData(candlestickParams(coinSymbol, interval, limit));
  const chartUrl = await generateChartURL(resCandlestick);
  const message = formatCoinResponse({coinSymbol, spotData, futuresData, changePriceSignal});
  const buttons = Markup.inlineKeyboard(generateButtons(coinSymbol));

  return [chartUrl, message, buttons, resCandlestick];
};