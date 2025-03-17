import axios from 'axios';

export async function getBinanceSpotPrice(symbol) {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`);

    const data = response?.data;
    if (data) {
      return {
        price: data?.['lastPrice'],
        volume: data?.['quoteVolume'],
        high: data?.['highPrice'],
        low: data?.['lowPrice'],
        change: data?.['priceChangePercent'],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Binance SPOT не поддерживает ${symbol}`);
    return null;
  }
}


export async function getCandlestickData(params) {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/klines`, {params});

    return response?.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error.message);
  }
}

export async function getBinanceFuturesPrice(symbol) {
  try {
    const response = await axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${symbol}USDT`);

    const data = response?.data;
    if (data) {
      return {
        price: data?.['lastPrice'],
        volume: data?.['quoteVolume'],
        high: data?.['highPrice'],
        low: data?.['lowPrice'],
        change: data?.['priceChangePercent']
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Binance FUTURES не поддерживает ${symbol}`);
    return null;
  }
}

export const fetchFuturesSymbols = async () => {
  console.info("📡 Запрос списка фьючерсных монет...");
  try {
    const response = await axios.get("https://fapi.binance.com/fapi/v1/exchangeInfo");
    const symbols = response?.data?.symbols?.map(s => s?.symbol?.toLowerCase());
    console.info(`✅ Найдено ${symbols.length} монет.`);
    return symbols;
  } catch (error) {
    console.error("❌ Ошибка при получении списка монет:", error);
    return [];
  }
};