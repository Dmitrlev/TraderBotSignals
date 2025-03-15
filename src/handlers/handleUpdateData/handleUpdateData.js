import {getBinanceFuturesPrice, getBinanceSpotPrice, getCandlestickData} from "../../services/binanceApi.js";
import {formatCoinResponse} from "../handleCoinPriceRequest/formatResponse.js";
import {generateChartURL} from "../handleCoinPriceRequest/generateCandlestickChart.js";
import {Markup} from "telegraf";
import {generateButtons} from "../utils/generateButtons.js";

export const handleUpdateCallback = async (ctx) => {
    const callbackData = ctx.update.callback_query.data;
    const [action, coinSymbol, interval, limit] = callbackData.split('_');

    if (action === 'update') {
        try {
            const chat_id = ctx.update.callback_query.message.chat.id;

            await ctx.answerCbQuery("🔄 Обновляем данные...");

            const [spotData, futuresData] = await Promise.all([
                getBinanceSpotPrice(coinSymbol),
                getBinanceFuturesPrice(coinSymbol),
            ]);

            const candlestickParams = {
                symbol: `${coinSymbol}USDT`,
                interval: "5m",
                limit: 60,
            };

            const resCandlestick = await getCandlestickData(candlestickParams);

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
            console.error("Ошибка при обновлении данных:", error);
            await ctx.answerCbQuery("❌ Ошибка при обновлении данных.");
        }
    }
};