import {generateChartURL} from "./generateCandlestickChart.js";
import {formatCoinResponse} from "./formatResponse.js";
import {getBinanceFuturesPrice, getBinanceSpotPrice, getCandlestickData} from "../../services/binanceApi.js";
import {Markup} from "telegraf";

const timeframes = [
  {label: "15m", interval: "4h", limit: 100},
  {label: "4h", interval: "1H", limit: 200},
  {label: "1H", interval: "1H", limit: 200},
  {label: "🔄", interval: "15m", limit: 60},
];

const generateButtons = (coinSymbol) => {
  return timeframes.map(({ label, interval, limit }) =>
    Markup.button.callback(
      label,
      "update_card",
    )
  );
};

// [Markup.button.callback("🔄 Обновить", `update_${coinSymbol}`)],

export const handleCoinPriceRequest = async (ctx, chat_id, symbol) => {

  if (!chat_id) {
    console.error("❌ Ошибка: chat_id не найден");
    return;
  }

  try {
    const coinSymbol = symbol?.toUpperCase();
    if (!coinSymbol) return;

    if (ctx?.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }

    const [spotData, futuresData] = await Promise.all([
      getBinanceSpotPrice(coinSymbol),
      getBinanceFuturesPrice(coinSymbol),
    ]);

    const candlestickParams = {
      symbol: `${coinSymbol}USDT`,
      interval: "5m",
      limit: 60,
    };

    console.log(candlestickParams)

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

    await ctx.telegram.sendPhoto(chat_id, chartUrl, {
      caption: message,
      parse_mode: "MarkdownV2",
      ...buttons,
    });
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    await ctx.telegram.sendMessage(
      chat_id,
      `❌ Ошибка при запросе данных для ${symbol.toUpperCase()}.`
    );
  }
};