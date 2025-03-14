import bot from "./src/bot/index.js";

bot.launch()
  .then(() => console.log("🤖 Бот запущен!"))
  .catch(err => console.error("Ошибка запуска:", err));

process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());