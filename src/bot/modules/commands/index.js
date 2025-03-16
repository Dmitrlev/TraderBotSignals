import {startCommand} from "./modules/start.js";
import {helpCommand} from "./modules/help.js";
import {COMMANDS} from "./constants.js";
import {settingsHandler} from "./handlers.js";

export const setupCommands = (bot) => {
  bot.start(startCommand);
  bot.help(helpCommand);

  bot.command(COMMANDS.settings, settingsHandler);
};