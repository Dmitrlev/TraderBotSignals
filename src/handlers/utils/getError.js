export const getError = (ctx, coinSymbol, error) => {
    ctx.telegram.sendMessage(
        process.env.BOT_TOKEN,
        `❌ Ошибка при запросе данных для ${coinSymbol}.`,
        error,
    );
}