import {COMMANDS} from "../../constants.js";
import {handleCoinPriceRequest} from "../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";

const {COIN_PRICE} = COMMANDS;

const map = {
  [COIN_PRICE]: handleCoinPriceRequest,
};

export const handleMessage = async (ctx) => {

  const text = ctx?.message?.text;

  if (!text) return;

  const message = ctx.message.text.trim();
  const firstChar = message.charAt(0);
  const content = message.slice(1).trim();

  const currentCommand = map[firstChar]

  if (!currentCommand) return;
  return await currentCommand(ctx, ctx?.chat?.id, content);
};