import {
  handleUpdateCallback
} from "../../../handlers/handleUpdateData/handleUpdateData.js";
import {BOT_COMMANDS_DATA} from "../commands/constants.js";
import {ACTIONS_TEXT} from "./constants.js";
import {SETTINGS} from "../../../settings.js";
import {handleAlCallback} from "../../../handlers/handleUpdateData/handleAlCallback.js";

export const setupActions = (bot) => {
  bot.action(BOT_COMMANDS_DATA.update, async (context) => {
    try {
      await context.answerCbQuery(ACTIONS_TEXT.dataUpdate);
      await handleUpdateCallback(context);
    } catch (error) {
      console.error(ACTIONS_TEXT.updateError, error);
      await context.reply(ACTIONS_TEXT.updateError);
    }
  });

  bot.action(BOT_COMMANDS_DATA.getDataAI, async (context) => {
    try {
      await context.answerCbQuery(ACTIONS_TEXT.dataUpdate);
      await handleAlCallback(context)
    } catch (error) {
      console.error(ACTIONS_TEXT.updateError, error);
      await context.reply(ACTIONS_TEXT.updateError);
    }
  });

  bot.action(BOT_COMMANDS_DATA.setInterval, (context) => {
    context.reply(ACTIONS_TEXT.newInterval);
    context.session = {action: BOT_COMMANDS_DATA.setInterval};
  });

  bot.action(BOT_COMMANDS_DATA.setPercents, (context) => {
    context.reply(ACTIONS_TEXT.newPercents);
    context.session = {action: BOT_COMMANDS_DATA.setPercents};
  });

  bot.action(BOT_COMMANDS_DATA.showSettings, (context) => {
    const {temporaryCandle, priceChangeThreshold} = SETTINGS.handler;
    context.reply(ACTIONS_TEXT.currentSettings(temporaryCandle, priceChangeThreshold));
  });
};