import {BOT_COMMANDS_DATA, MESSAGES_TEXT, VALID_CANDLES} from "./constants.js";
import {saveSettings, SETTINGS} from "../../../settings.js";

export const settingsHandler = (context) => {
    context.reply(MESSAGES_TEXT.botSettings, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: MESSAGES_TEXT.interval, callback_data: BOT_COMMANDS_DATA.setInterval },
                    { text: MESSAGES_TEXT.percent, callback_data: BOT_COMMANDS_DATA.setPercents },
                ],
                [{ text: MESSAGES_TEXT.showSettings, callback_data: BOT_COMMANDS_DATA.showSettings }],
            ],
        },
    });
}

export const shortHandler = (context) => {
    context.reply(`${MESSAGES_TEXT.shortText}`);
}

export const longHandler = (context) => {
    context.reply(`${MESSAGES_TEXT.longText}`);
}

export const handleSetInterval = (context) => {
    const newInterval = context.message.text.trim();
    const validCandles = VALID_CANDLES;

    if (validCandles.includes(newInterval)) {
        SETTINGS.handler.temporaryCandle = newInterval;
        saveSettings(SETTINGS);
        context.reply(`${MESSAGES_TEXT.changedInterval} ${newInterval}`);
    } else {
        context.reply(
            `${MESSAGES_TEXT.wrongInterval} ${validCandles.join(", ")}`
        );
    }

    context.session = null;
};

export const handleSetPercent = (context) => {
    const newPercent = parseFloat(context.message.text.trim());

    if (!isNaN(newPercent)) {
        SETTINGS.handler.priceChangeThreshold = newPercent;
        saveSettings(SETTINGS);
        context.reply(`${MESSAGES_TEXT.changedPercents} ${newPercent}%`);
    } else {
        context.reply(MESSAGES_TEXT.wrongPercents);
    }

    context.session = null;
};