export const COMMANDS = {
    settings: 'settings',
    short: 's',
    long: 'l',
}

export const MESSAGES_TEXT = {
    botSettings: 'Настройки бота ⚙️',
    interval: '🏹 Настроить интервал',
    percent: '📈 Настроить процент роста',
    showSettings: '🔧 Показать текущие настройки',
    changedInterval: '✅ Интервал свечи изменен на:',
    wrongInterval: '❌ Неверный интервал. Допустимые значения:',
    changedPercents: '✅ Порог изменения цены изменен на:',
    wrongPercents: '❌ Введите корректное число.',
    shortText: '💫 Милсдарь, судьба велит нагнуть этот рынок к земле 🤾‍',
    longText: '🚀 Брат, летим на марс пока Маск принимает душ 🚀',
    websocketSuccessStart: '✅ WebSocket успешно запущен и анализирует данные.',
    websocketWrongStart: '❌ Ошибка при запуске WebSocket:',
    successSetCommandsList: '✅ Список комманд успешно установлен',
    setCommandsListError: '❌ Ошибка при установке списка комманд',
}

export const BOT_COMMANDS_DATA = {
    update: /^update_(.+)$/,
    setInterval: 'set_interval',
    setPercents: 'set_percent',
    showSettings: 'show_settings',
}

export const VALID_CANDLES = ["1m", "5m", "15m", "1h", "4h", "1d"];

export const COMMANDS_LIST = [
    { command: "settings", description: "Список настроек" },
    { command: "s", description: "Идти в шорт" },
    { command: "l", description: "Идти в лонг" },
]