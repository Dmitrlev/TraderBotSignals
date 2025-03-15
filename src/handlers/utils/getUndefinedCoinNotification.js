export const getUndefinedCoinNotification = (context, coinSymbol) => context.telegram.sendMessage(
    context.chat.id,
    `⚠️ Монета *${coinSymbol}* не найдена ни на SPOT, ни на FUTURES Binance.`,
    { parse_mode: "Markdown" }
);