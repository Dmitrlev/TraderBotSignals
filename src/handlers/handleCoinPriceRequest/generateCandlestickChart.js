import QuickChart from "quickchart-js";

const binanceColors = {
  up: "#2dbd85",
  down: "#f6475d",
  backgroundColor: '#17191d',
};

export async function generateChartURL(rawCandles) {

  const candles = rawCandles.map(c => ({
    x: c[0],
    o: parseFloat(c[1]),
    h: parseFloat(c[2]),
    l: parseFloat(c[3]),
    c: parseFloat(c[4]),
    color: 'rgba(0,74,255,0.8)',
  }));

  const chart = new QuickChart();
  chart.setConfig({
    type: "candlestick",
    data: {
      datasets: [{
        data: candles,
        color: {
          up: binanceColors.up,
          down: binanceColors.down,
        }
      }]
    },
    options: {
      scales: {
        x: {
          adapters: {
            date: {
              zone: 'UTC+3'
            }
          },
          time: {
            unit: "hour",
            stepSize: 6,
            displayFormats: {
              hour: "HH:mm",
            }
          },
          ticks: {
            autoSkip: false,
          },
        }
      },
      plugins: {
        legend: {display: false},
        backgroundColor: binanceColors.backgroundColor
      }
    },
  });

  chart?.setVersion("3");

  return chart?.getUrl();
}