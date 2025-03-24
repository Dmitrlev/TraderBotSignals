import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import PDFDocument from 'pdfkit';

export async function sendAiAsPdfFile(context, chat_id, aiMessage) {
    const fileName = `ai_${randomUUID()}.pdf`;
    const filePath = path.resolve('./temp', fileName);

    if (!fs.existsSync('./temp')) {
        fs.mkdirSync('./temp');
    }

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // ✅ Подключаем шрифт с поддержкой кириллицы
    const fontPath = path.resolve('src/api/utils/fonts/Roboto.ttf');
    doc.font(fontPath).fontSize(12);

    const lines = aiMessage.split('\n');
    lines.forEach((line) => {
        doc.text(line, { lineGap: 4 });
    });

    doc.end();

    writeStream.on('finish', async () => {
        try {
            await context.telegram.sendDocument(chat_id, {
                source: filePath,
                filename: 'ai_analysis.pdf',
            });
        } catch (error) {
            console.error('Ошибка при отправке PDF файла:', error);
        } finally {
            fs.unlink(filePath, (err) => {
                if (err) console.error('Ошибка при удалении файла:', err);
            });
        }
    });
}
