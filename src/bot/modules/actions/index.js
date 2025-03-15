import {
  handleUpdateCallback
} from "../../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";

export const actions = {
  update_: handleUpdateCallback,
};

export const setupActions = (bot) => {
  bot.action(/^update_(.+)$/, async (ctx) => {
    try {
      await ctx.answerCbQuery("🔄 Обновляем данные...");
      await handleUpdateCallback(ctx);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      await ctx.reply("❌ Ошибка при обновлении данных.");
    }
  });
};