import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";
import {getSendData} from "../utils/getSendData.js";

export const handleUpdateCallback = async (context) => {
  const callbackData = context.update.callback_query.data;
  const [action, coinSymbol, interval, limit] = callbackData.split('_');

  if (action === 'update') {
    try {
      await context.answerCbQuery("🔄 Обновляем данные ...");

      const [spotData, futuresData] = await getPrice(coinSymbol);

      if (!spotData && !futuresData) {
        return await getUndefinedCoinNotification(context, coinSymbol);
      }

      const [chartUrl, message, buttons] = await getSendData(coinSymbol, spotData, futuresData, null, interval, limit);

      await context.editMessageMedia({
        type: 'photo',
        media: chartUrl,
      });

      await context.editMessageCaption(message, {
        parse_mode: "MarkdownV2",
        reply_markup: buttons.reply_markup,
      });

    } catch (error) {
      await getError(context, context?.chat?.id, coinSymbol, error);
    }
  }
};