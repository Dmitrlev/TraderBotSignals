export const getUndefinedCoinNotification = (ctx, coinSymbol) => ctx.telegram.sendMessage(
    process.env.BOT_TOKEN,
    `⚠️ Монета *${coinSymbol}* не найдена ни на SPOT, ни на FUTURES Binance.`,
    { parse_mode: "Markdown" }
);