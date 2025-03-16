import path from "path";

export const COMMANDS = {
  COIN_PRICE: "$",
};

export const SETTINGS_TEXT = {
  settingsError: '❌ Ошибка при загрузке настроек:',
  saveError: '❌ Ошибка при сохранении настроек:',
}

export const SETTINGS_FILE = path.resolve("settings.json");

export const DEFAULT_SETTINGS = {
  candlestick: {
    interval: "15m",
    limit: 60,
  },
  handler: {
    temporaryCandle: "15m",
    priceChangeThreshold: 3,
  },
};