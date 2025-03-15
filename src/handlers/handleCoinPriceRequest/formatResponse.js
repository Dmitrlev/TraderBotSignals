import {cleanData, formatLargeNumber} from "./helpers.js";
import {SETTINGS} from "../../settings.js";

export const formatCoinResponse = ({coinSymbol, spotData, futuresData, changePriceSignal = null}) => {

  const {
    price: spotPrice = null,
    high: spotHigh = null,
    low: spotLow = null,
    volume: spotVolume = null,
    change: spotChange = null,
  } = cleanData(spotData) || {};

  const {
    price: futuresPrice = null,
    high: futuresHigh = null,
    low: futuresLow = null,
    volume: futuresVolume = null,
    change: futuresChange = null,
  } = cleanData(futuresData) || {};

  const changePriceFinal = changePriceSignal
    ? `🔥  За последние *${SETTINGS.handler.temporaryCandle}* \`\\(${changePriceSignal}\`%\\)` + '\n'
    : '';

  const changePars = (spotChange || futuresChange);
  const title = `${changePars === 0 ? '⚪️' : (changePars > 0 ? '🟢' : '🔴')} *${coinSymbol}* \`\\(${changePars}\`%\\)` + '\n';

  const spot = spotPrice
    ? `🏦 *SP:*  $\`${spotPrice}\`` + '\n'
    : '';

  const futures =
    futuresPrice
      ? `🎢 *FT:*  $\`${futuresPrice}\`` + '\n'
      : '';

  const minMax = (spotHigh || futuresHigh) && (spotLow || futuresLow)
    ? `⛅️️  $\`${spotHigh || futuresHigh}\`   🌧  $\`${spotLow || futuresLow}\`` + '\n'
    : '';


  const volumePars = formatLargeNumber(spotVolume || futuresVolume);
  const volumeFinal = volumePars
    ? `💰  $\`${volumePars}\`` + '\n'
    : '';

  return `${changePriceFinal}\n${title}\n${spot}${futures}\n${minMax}${volumeFinal}`;
};

