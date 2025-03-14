import WebSocket from "ws";
import {fetchFuturesSymbols} from "../../services/binanceApi.js";
import {handleCoinPriceRequest} from "../../handlers/handleCoinPriceRequest/handleCoinPriceRequest.js";

const getWsUrl = (streams) => `wss://fstream.binance.com/stream?streams=${streams}`;
const TEMPORARY_CANDLE = "15m";
const PRICE_CHANGE_THRESHOLD = 4;

/**
 * Запускаем WebSocket Binance и анализируем данные volk
 */

export const startWebSocket = async (bot) => {
  console.log("Старт WebSocket Binance...");

  const symbols = await fetchFuturesSymbols();
  if (symbols.length === 0) return console.error("❌ Список монет пуст, WebSocket не запущен.");

  // const symbolsTest = symbols.slice(0, 1)

  const batchSize = 200;
  const batches = [];

  for (let i = 0; i < symbols.length; i += batchSize) {
    batches.push(symbols.slice(i, i + batchSize));
  }

  console.log(`📦 Разбито на ${batches.length} пакетов по ${batchSize} монет.`);

  /**
   * Обработка свечей и логика изменения цены
   */

  const priceHistory = {}; // Хранилище истории изменений

  const processCandle = (symbol, candle) => {
    const lowPrice = parseFloat(candle.l); // Минимальная цена за период
    const highPrice = parseFloat(candle.h); // Максимальная цена за период
    const openPrice = parseFloat(candle.o); // Цена открытия
    const currentPrice = parseFloat(candle.c); // Текущая цена

    let percentChange;
    let direction;

    if (currentPrice > openPrice) {
      percentChange = ((currentPrice - lowPrice) / lowPrice) * 100;
      direction = "📈 ВЫРОСЛА";
    } else {
      percentChange = ((currentPrice - highPrice) / highPrice) * 100;
      direction = "📉 УПАЛА";
    }

    const absChange = Math.abs(percentChange);
    const lastChange = priceHistory[symbol] || 0;

    // console.log(absChange)

    if (absChange >= PRICE_CHANGE_THRESHOLD && absChange >= lastChange + PRICE_CHANGE_THRESHOLD) {
      console.log(`🚀 [ALERT] ${symbol.toUpperCase()} ${direction} на ${absChange.toFixed(2)}% за ${TEMPORARY_CANDLE}.`);

      if (bot) {
        handleCoinPriceRequest(bot, process.env.CHAT_ID, symbol.slice(0, -4));
      }

      // Обновляем историю изменений
      priceHistory[symbol] = absChange;
    }
  };

  /**
   * Подключаем WebSocket к Binance
   */

  const connectWebSocket = (symbolsBatch, index) => {
    console.log(`🔗 Подключение WebSocket №${index + 1}... (${symbolsBatch.length} монет)`);

    const streams = symbolsBatch.map((s) => `${s.toLowerCase()}@kline_${TEMPORARY_CANDLE}`).join("/");

    const wsUrl = getWsUrl(streams);
    const ws = new WebSocket(wsUrl);

    const handleMessage = (message) => {
      // console.log(`📩 Получено сообщение от Binance: ${message.slice(0, 50)}...`);

      try {
        const data = JSON.parse(message);
        if (data?.data?.k) {
          // console.log(data?.data?.k)
          processCandle(data.data.s.toLowerCase(), data.data.k);
        }
      } catch (error) {
        console.error("❌ Ошибка парсинга сообщения:", error);
      }
    }

    const handleClose = (index, symbolsBatch) => {
      console.log(`🔄 WebSocket ${index + 1} закрылся. Перезапуск через 5 секунд...`);
      setTimeout(() => connectWebSocket(symbolsBatch, index), 5000);
    }

    ws.addEventListener("open", () => console.log(`✅ WebSocket ${index + 1} на ${symbolsBatch.length} монет открыт.`));
    ws.addEventListener("error", (error) => console.error(`❌ Ошибка WebSocket ${index + 1}:`, error));
    ws.addEventListener("message", (event) => handleMessage(event.data));
    ws.addEventListener("close", () => handleClose(index, symbolsBatch));
  };

  batches.forEach((batch, index) => connectWebSocket(batch, index));
};