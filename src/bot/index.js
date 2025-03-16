import {setupCommands} from "./modules/commands/index.js";
import {setupActions} from "./modules/actions/index.js";
import {handleMessage} from "./modules/messages.js";
import dotenv from "dotenv";
import {session, Telegraf} from "telegraf";
import {startWebSocket} from "./modules/websocket.js";

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());

setupCommands(bot);
setupActions(bot);

bot.on("message", handleMessage);

startWebSocket(bot)
  .then(() => {console.log("✅ WebSocket успешно запущен и анализирует данные.")})
  .catch((err) => {console.error("❌ Ошибка при запуске WebSocket:", err)});

export default bot;