import {timeframes} from "../constants/buttons.js";
import {Markup} from "telegraf";

export const generateButtons = (coinSymbol: string) => {
    return timeframes.map(({ label, interval, limit }) =>
        Markup.button.callback(
            label,
            `update_${coinSymbol}_${interval}_${limit}`,
        )
    );
};