import {generateChartURL} from "./generateCandlestickChart.js";
import {formatCoinResponse} from "./formatResponse.js";
import {getCandlestickData} from "../../services/binanceApi.js";
import {Markup} from "telegraf";
import {generateButtons} from "../utils/generateButtons.js";
import {candlestickParams} from "../constants/candlestick.js";
import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";

export const handleCoinPriceRequest = async (ctx, chat_id, symbol) => {
  if (!chat_id) {
    console.error("❌ Ошибка: chat_id не найден");
    return;
  }

  const coinSymbol = symbol?.toUpperCase();

  try {
    if (!coinSymbol) return;

    if (ctx?.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }

    const [spotData, futuresData] = await getPrice(coinSymbol);

    if (!spotData && !futuresData) {
      return await getUndefinedCoinNotification(ctx, coinSymbol);
    }

    const resCandlestick = await getCandlestickData(candlestickParams(coinSymbol));

    const chartUrl = await generateChartURL(resCandlestick);
    const message = formatCoinResponse({ coinSymbol, spotData, futuresData });

    const buttons = Markup.inlineKeyboard([generateButtons(coinSymbol)]);

    await ctx.telegram.sendPhoto(chat_id, chartUrl, {
      caption: message,
      parse_mode: "MarkdownV2",
      ...buttons,
    });
  } catch (error) {
    getError(ctx, coinSymbol, error);
  }
};