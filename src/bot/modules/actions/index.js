import {
    handleCoinPriceRequest,
    handleUpdateCallback
} from "../../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";

export const actions = {
  update_: handleUpdateCallback,
};

export const setupActions = (bot) => {
  bot.action(/^update_(.+)$/, async (ctx) => {
    try {
      const symbol = ctx.match[1];
      await ctx.answerCbQuery("🔄 Обновляем данные...");
      await handleCoinPriceRequest(ctx, symbol, true); // Передаем флаг обновления
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      await ctx.reply("❌ Ошибка при обновлении данных.");
    }
  });
};