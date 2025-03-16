export const COMMANDS = {
    settings: 'settings',
}

export const MESSAGES_TEXT = {
    botSettings: 'Настройки бота',
    interval: 'Настроить интервал',
    percent: 'Настроить процент',
    showSettings: 'Показать текущие настройки',
    changedInterval: '✅ Интервал свечи изменен на:',
    wrongInterval: '❌ Неверный интервал. Допустимые значения:',
    changedPercents: '✅ Порог изменения цены изменен на:',
    wrongPercents: '❌ Введите корректное число.',
}

export const BOT_COMMANDS_DATA = {
    update: /^update_(.+)$/,
    setInterval: 'set_interval',
    setPercents: 'set_percent',
    showSettings: 'show_settings',
}

export const VALID_CANDLES = ["1m", "5m", "15m", "1h", "4h", "1d"];