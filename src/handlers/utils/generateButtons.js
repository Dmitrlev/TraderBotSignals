import {timeframes} from "../constants/buttons.js";
import {Markup} from "telegraf";

export const generateButtons = (coinSymbol) => {

  const topLine = timeframes.map(({ label, interval, limit }) =>
    Markup.button.callback(label, `update_${coinSymbol}_${interval}_${limit}`)
  );

  return [topLine, [Markup.button.callback('AI', `getDataAI_${coinSymbol}`)]]
};