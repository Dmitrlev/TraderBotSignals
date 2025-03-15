export const getError = (ctx, coinSymbol, error) => {
  ctx.telegram.sendMessage(
    process.env.CHAT_ID,
    `❌ Ошибка при запросе данных для ${coinSymbol}.`,
    error,
  );
}