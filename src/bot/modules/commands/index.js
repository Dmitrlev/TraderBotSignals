import {startCommand} from "./modules/start.js";
import {helpCommand} from "./modules/help.js";

export const setupCommands = (bot) => {
  bot.start(startCommand);
  bot.help(helpCommand);
};