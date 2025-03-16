import {startCommand} from "./modules/start.js";
import {helpCommand} from "./modules/help.js";
import {COMMANDS} from "./constants.js";
import {longHandler, settingsHandler, shortHandler} from "./handlers.js";

export const setupCommands = (bot) => {
  bot.start(startCommand);
  bot.help(helpCommand);

  bot.command(COMMANDS.settings, settingsHandler);
  bot.command(COMMANDS.short, shortHandler);
  bot.command(COMMANDS.long, longHandler);
};