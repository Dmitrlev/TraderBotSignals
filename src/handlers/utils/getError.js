export const getError = (context, coinSymbol, error) => {
  context.telegram.sendMessage(
      context.chat.id,
    `❌ Ошибка при запросе данных для ${coinSymbol}.`,
    error,
  );
}