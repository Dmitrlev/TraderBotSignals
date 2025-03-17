export const getError = async (context, chat_id, coinSymbol, error) => {
  if (!chat_id) {
    console.error("Ошибка: chat_id не определён", { chat_id, coinSymbol, error });
    return;
  }

  console.error(`❌ Ошибка при получении данных для ${coinSymbol}: ${error}`);
};