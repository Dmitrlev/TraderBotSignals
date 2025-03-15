import {COMMANDS} from "../../constants.js";
import {handleCoinPriceRequest} from "../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";

const {COIN_PRICE} = COMMANDS;

const map = {
  [COIN_PRICE]: handleCoinPriceRequest,
};

export const handleMessage = async (context) => {
  const text = context?.message?.text;

  if (!text) return;

  const message = context.message.text.trim();
  const firstChar = message.charAt(0);
  const content = message.slice(1).trim();

  const currentCommand = map[firstChar];

  if (!currentCommand) return;
  return await currentCommand(context, context?.chat?.id, content);
};