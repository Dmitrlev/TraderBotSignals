export const getUndefinedCoinNotification = (ctx, coinSymbol) => ctx.telegram.sendMessage(
    process.env.CHAT_ID,
    `⚠️ Монета *${coinSymbol}* не найдена ни на SPOT, ни на FUTURES Binance.`,
    { parse_mode: "Markdown" }
);