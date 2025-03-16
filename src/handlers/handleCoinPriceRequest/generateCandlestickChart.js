import QuickChart from "quickchart-js";
import {getSMA} from "../utils/getSMA.js";
import {getCandleScale} from "../utils/getCandleScale.js";
import {chartColors} from "../constants/chartColors.js";

export async function generateChartURL(rawCandles) {
  const candles = rawCandles.map(c => ({
    x: c[0],
    o: parseFloat(c[1]),
    h: parseFloat(c[2]),
    l: parseFloat(c[3]),
    c: parseFloat(c[4]),
  }));

  const sma = getSMA(candles, 10);
  const [minX, maxX, offsetX] = getCandleScale(candles);

  const chart = new QuickChart();
  chart.setConfig({
    type: "candlestick",
    data: {
      datasets: [
        {
          data: candles,
          color: {
            up: chartColors.up,
            down: chartColors.down,
          },
          borderColor: {
            up: chartColors.up,
            down: chartColors.down,
          },
          borderWidth: 1,
        },
        {
          type: "line",
          data: sma,
          borderColor: chartColors.smaColor,
          borderWidth: 1.5,
          fill: false,
          pointRadius: 0,
          tension: 0.2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: chartColors.gridColor },
          ticks: { color: chartColors.textColor, autoSkip: false },
          time: {
            unit: "hour",
            stepSize: 6,
            displayFormats: { hour: "HH:mm" },
          },
          min: minX,
          max: maxX + offsetX,
        },
        y: {
          grid: { color: chartColors.gridColor },
          ticks: { color: chartColors.textColor },
        },
      },
      plugins: {
        legend: { display: false },
      },
      backgroundColor: chartColors.backgroundColor,
    },
  });

  chart.setBackgroundColor(chartColors.backgroundColor);
  chart.setVersion("3");

  return chart.getUrl();
}
