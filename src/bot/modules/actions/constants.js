export const ACTIONS_TEXT = {
    dataUpdate: '🔄 Обновляем данные...',
    updateError: '❌ Ошибка при обновлении данных.',
    newInterval: 'Введите новый интервал (например, 15m):',
    newPercents: 'Введите новый порог изменения цены (например, 3):',
    currentSettings: (temporaryCandle, priceChangeThreshold) => `Текущие настройки:\n - Интервал свечи: ${temporaryCandle}\n - Порог изменения цены: ${priceChangeThreshold}%`,
}