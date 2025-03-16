export const getError = async (context, coinSymbol, error) => {
  if (!context?.chat?.id) {
    console.error("Ошибка: context.chat.id не определён", { context, coinSymbol, error });
    return;
  }

  await context.reply(`❌ Ошибка при получении данных для ${coinSymbol}: ${error.message}`);
};