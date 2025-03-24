import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";
import {getSendData} from "../utils/getSendData.js";
import {getOpenAiResponse} from "../../api/openAiApi.js";
import {sendAiAsTextFile} from "../../api/utils/generateFile.js";

export const handleCoinPriceRequest = async (context, chat_id, symbol, changePriceSignal) => {

  if (!chat_id) {
    console.error("❌ Ошибка: chat_id не найден");
    return;
  }

  const coinSymbol = symbol?.toUpperCase();

  try {
    if (!coinSymbol) return;
    await context.telegram.sendChatAction(chat_id, "typing");

    if (context?.message?.message_id) {
      await context.deleteMessage(context.message.message_id);
    }

    const [spotData, futuresData] = await getPrice(coinSymbol);

    if (!spotData && !futuresData) {
      return await getUndefinedCoinNotification(context, coinSymbol);
    }

    if (futuresData && !spotData) {
      return;
    }

    const [chartUrl, message, buttons, resCandlestick] = await getSendData(coinSymbol, spotData, futuresData, changePriceSignal);
    const aiPrompt = {
      message,
      chartUrl,
      candlesData: resCandlestick,
    }

    getOpenAiResponse(JSON.stringify(aiPrompt), chartUrl).then((aiMessage) => {
      context.telegram.sendPhoto(chat_id, chartUrl, {
        caption: message,
        parse_mode: "MarkdownV2",
        ...buttons,
      }).then(() => {
        sendAiAsTextFile(context, chat_id, aiMessage);
      });

    }).catch((error) => console.log(error));

  } catch (error) {
    await getError(context, chat_id, coinSymbol, error);
  }
};