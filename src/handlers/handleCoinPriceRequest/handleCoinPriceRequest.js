import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";
import {getSendData} from "../utils/getSendData.js";

export const handleCoinPriceRequest = async (ctx, chat_id, symbol) => {
  if (!chat_id) {
    console.error("❌ Ошибка: chat_id не найден");
    return;
  }

  const coinSymbol = symbol?.toUpperCase();

  try {
    if (!coinSymbol) return;

    await ctx.reply("Запрашиваем данные...", { disable_notification: true });

    if (ctx?.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }

    const [spotData, futuresData] = await getPrice(coinSymbol);

    if (!spotData && !futuresData) {
      return await getUndefinedCoinNotification(ctx, coinSymbol);
    }

    const [chartUrl, message, buttons] = await getSendData(coinSymbol, spotData, futuresData);

    await ctx.telegram.sendPhoto(chat_id, chartUrl, {
      caption: message,
      parse_mode: "MarkdownV2",
      ...buttons,
    });
  } catch (error) {
    await getError(ctx, coinSymbol, error);
  }
};