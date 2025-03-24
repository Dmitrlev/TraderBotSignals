import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export async function sendAiAsTextFile(context, chat_id, aiMessage) {
    const fileName = `ai_${randomUUID()}.txt`; // уникальное имя
    const filePath = path.resolve('./temp', fileName);

    // Создаем временную папку, если её нет
    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
    }

    // Записываем файл
    fs.writeFileSync(filePath, aiMessage, 'utf8');

    try {
        // Отправляем файл
        await context.telegram.sendDocument(chat_id, {
            source: filePath,
            filename: 'ai_analysis.txt',
        });
    } catch (error) {
        console.error('Ошибка при отправке файла:', error);
    } finally {
        // Удаляем файл после отправки
        fs.unlink(filePath, (err) => {
            if (err) console.error('Ошибка при удалении файла:', err);
        });
    }
}
