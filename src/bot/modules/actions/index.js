import {
  handleUpdateCallback
} from "../../../handlers/handleUpdateData/handleUpdateData.js";

export const actions = {
  update_: handleUpdateCallback,
};

export const setupActions = (bot) => {
  bot.action(/^update_(.+)$/, async (context) => {
    try {
      await context.answerCbQuery("🔄 Обновляем данные...");
      await handleUpdateCallback(context);
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      await context.reply("❌ Ошибка при обновлении данных.");
    }
  });
};