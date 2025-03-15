import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";
import {getUndefinedCoinNotification} from "../utils/getUndefinedCoinNotification.js";
import {getSendData} from "../utils/getSendData.js";

export const handleUpdateCallback = async (ctx) => {
    const callbackData = ctx.update.callback_query.data;
    const [action, coinSymbol] = callbackData.split('_');

    if (action === 'update') {
        try {
            await ctx.answerCbQuery("🔄 Обновляем данные...");

            const [spotData, futuresData] = await getPrice(coinSymbol);

            if (!spotData && !futuresData) {
                return await getUndefinedCoinNotification(ctx, coinSymbol);
            }

            const [chartUrl, message, buttons] = await getSendData(coinSymbol, spotData, futuresData);

            await ctx.editMessageMedia({
                type: 'photo',
                media: chartUrl,
            });
            await ctx.editMessageCaption(message, {
                parse_mode: "MarkdownV2",
                reply_markup: buttons.reply_markup,
            });

        } catch (error) {
            getError(ctx, coinSymbol, error);
        }
    }
};