import {setupCommands} from "./modules/commands/index.js";
import {setupActions} from "./modules/actions/index.js";
import {handleMessage} from "./modules/messages.js";
import dotenv from "dotenv";
import {session, Telegraf} from "telegraf";
import {startWebSocket} from "./modules/websocket.js";
import {COMMANDS_LIST, MESSAGES_TEXT} from "./modules/commands/constants.js";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

bot.telegram.setMyCommands(COMMANDS_LIST)
    .then(() => console.info(MESSAGES_TEXT.successSetCommandsList))
    .catch((error) => console.error(MESSAGES_TEXT.setCommandsListError, error));

setupCommands(bot);
setupActions(bot);

bot.on("message", handleMessage);

startWebSocket(bot)
  .then(() => console.info(MESSAGES_TEXT.websocketSuccessStart))
  .catch((err) => console.error(MESSAGES_TEXT.websocketWrongStart, err));

export default bot;