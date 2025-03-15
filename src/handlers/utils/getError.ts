export const getError = (ctx: any, coinSymbol: string, error: Error) => {
    ctx.telegram.sendMessage(
        process.env.BOT_TOKEN,
        `❌ Ошибка при запросе данных для ${coinSymbol}.`,
        error,
    );
}