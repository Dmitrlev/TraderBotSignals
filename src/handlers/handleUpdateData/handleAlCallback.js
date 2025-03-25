import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getSendData} from "../utils/getSendData.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";
import {generateTextImageBuffer} from "../utils/generateTextImageBuffer.js";
import {getOpenAiResponse} from "../../api/openAiApi.js";

export const handleAlCallback = async (context) => {
  const callbackData = context.update.callback_query.data;
  const [action, coinSymbol] = callbackData.split('_');

  if (action === 'getDataAI') {
    try {
      await context.answerCbQuery("Запрос к AI...");

      const [spotData, futuresData] = await getPrice(coinSymbol);
      if (!spotData && !futuresData) {
        return await getUndefinedCoinNotification(context, coinSymbol);
      }

      const [chartUrl, message, buttons, resCandlestick] = await getSendData(
        coinSymbol,
        spotData,
        futuresData,
        null
      );

      const aiPrompt = {
        message,
        chartUrl,
        candlesData: resCandlestick,
      };

      const aiMessage = await getOpenAiResponse(JSON.stringify(aiPrompt), chartUrl);
      const textImageBuffer = generateTextImageBuffer(aiMessage);

      await context.editMessageMedia(
        {
          type: 'photo',
          media: { source: textImageBuffer },
          caption: message,
          parse_mode: 'MarkdownV2',
        },
        {
          reply_markup: buttons.reply_markup,
        }
      );

    } catch (error) {
      await getError(context, context?.chat?.id, coinSymbol, error);
    }
  }
};