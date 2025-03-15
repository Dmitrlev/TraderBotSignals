import {getCandlestickData} from "../../services/binanceApi.js";
import {formatCoinResponse} from "../handleCoinPriceRequest/formatResponse.js";
import {generateChartURL} from "../handleCoinPriceRequest/generateCandlestickChart.js";
import {Markup} from "telegraf";
import {generateButtons} from "../utils/generateButtons.js";
import {candlestickParams} from "../constants/candlestick.js";
import {getPrice} from "../utils/getPrice.js";
import {getError} from "../utils/getError.js";

export const handleUpdateCallback = async (ctx: any) => {
    const callbackData = ctx.update.callback_query.data;
    const [action, coinSymbol] = callbackData.split('_');

    if (action === 'update') {
        try {
            const chat_id = ctx.update.callback_query.message.chat.id;

            await ctx.answerCbQuery("🔄 Обновляем данные...");

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