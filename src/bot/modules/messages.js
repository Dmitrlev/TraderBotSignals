import {COMMANDS} from "../../constants.js";
import {handleCoinPriceRequest} from "../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";
import {handleSetInterval, handleSetPercent} from "./commands/handlers.js";
import {BOT_COMMANDS_DATA} from "./commands/constants.js";

const {COIN_PRICE} = COMMANDS;

const map = {
  [COIN_PRICE]: handleCoinPriceRequest,
};

export const handleMessage = async (context) => {
  const text = context?.message?.text;
  const { session } = context;

  if (!text) return;

  if (session?.action === BOT_COMMANDS_DATA.setInterval) {
    return handleSetInterval(context);
  } else if (session?.action === BOT_COMMANDS_DATA.setPercents) {
    return handleSetPercent(context);
  }

  const message = context.message.text.trim();
  const firstChar = message.charAt(0);
  const content = message.slice(1).trim();

  const currentCommand = map[firstChar];

  if (!currentCommand) return;
  return await currentCommand(context, context?.chat?.id, content);
};