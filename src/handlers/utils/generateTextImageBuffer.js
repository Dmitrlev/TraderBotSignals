import { createCanvas } from "canvas";

export const generateTextImageBuffer = (text) => {
  const width = 800;
  const padding = 40;
  const lineHeight = 36;
  const font = '24px Arial';

  const tempCanvas = createCanvas(1, 1);
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.font = font;

  const coloredLines = [];
  const rawLines = text.split('\n');

  rawLines.forEach(rawLine => {
    const cleanedLine = removeEmojis(rawLine);
    const wrapped = wrapTextWithStyling(tempCtx, cleanedLine, width - padding * 2);
    coloredLines.push(...wrapped);
  });

  const height = padding * 2 + coloredLines.length * lineHeight;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#131722';
  ctx.fillRect(0, 0, width, height);

  ctx.font = font;
  ctx.textBaseline = 'top';

  coloredLines.forEach((segments, index) => {
    drawStyledSegments(ctx, segments, padding, padding + index * lineHeight);
  });

  return canvas.toBuffer();
};

function removeEmojis(text) {
  return text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '').trim();
}

function wrapTextWithStyling(ctx, text, maxWidth) {
  const lines = [];
  const segments = [];
  // Разделим: часть до двоеточия — будет жирной
  const colonIndex = text.indexOf(':');
  let preColon = '';
  let postColon = text;

  if (colonIndex !== -1) {
    preColon = text.slice(0, colonIndex + 1);
    postColon = text.slice(colonIndex + 1).trim();
  }

  if (preColon) {
    segments.push({ text: preColon, bold: true });
  }

  const words = postColon.split(' ');
  words.forEach(word => {
    if (!word) return;

    const isPrice = /\$\d/.test(word);
    segments.push({
      text: word,
      bold: isPrice
    });
  });

  const wrappedLines = [];
  let currentLine = [];
  let lineWidth = 0;

  segments.forEach(segment => {
    const textWithSpace = segment.text + ' ';
    const width = ctx.measureText(textWithSpace).width;

    if (lineWidth + width > maxWidth && currentLine.length > 0) {
      wrappedLines.push(currentLine);
      currentLine = [];
      lineWidth = 0;
    }

    currentLine.push(segment);
    lineWidth += width;
  });

  if (currentLine.length > 0) wrappedLines.push(currentLine);

  return wrappedLines;
}

function drawStyledSegments(ctx, segments, x, y) {
  let offsetX = x;

  segments.forEach(segment => {
    ctx.fillStyle = 'white';
    ctx.font = segment.bold ? 'bold 24px Arial' : '24px Arial';

    const textWithSpace = segment.text + ' ';
    ctx.fillText(textWithSpace, offsetX, y);

    offsetX += ctx.measureText(textWithSpace).width;
  });
}