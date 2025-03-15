import {generateChartURL} from "./generateCandlestickChart.js";
import {formatCoinResponse} from "./formatResponse.js";
import {getCandlestickData} from "../../services/binanceApi.js";
import {Markup} from "telegraf";
import {generateButtons} from "../utils/generateButtons.js";
import {candlestickParams} from "../constants/candlestick.js";
import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";

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

    const resCandlestick = await getCandlestickData(candlestickParams(coinSymbol));

    if (!spotData && !futuresData) {
      return await ctx.telegram.sendMessage(
          chat_id,
          `⚠️ Монета *${coinSymbol}* не найдена ни на SPOT, ни на FUTURES Binance.`,
          { parse_mode: "Markdown" }
      );
    }

    const message = formatCoinResponse({ coinSymbol, spotData, futuresData });
    const chartUrl = await generateChartURL(resCandlestick);

    const buttons = Markup.inlineKeyboard([generateButtons(coinSymbol)]);

    await ctx.telegram.sendPhoto(chat_id, chartUrl, {
      caption: message,
      parse_mode: "MarkdownV2",
      ...buttons,
    });
  } catch (error) {
    await getError(ctx, coinSymbol, error);
  }
};