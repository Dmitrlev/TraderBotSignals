export const cleanData = (data) => {
  if (!data || typeof data !== "object") return null;

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, formatNumber(value)])
  );
};

const formatNumber = (value) => {
  if (value === undefined || value === null) return null;

  return String(value).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
};

export const formatLargeNumber = (num, decimals = 2) => {
  if (num === undefined || num === null) return "N/A";

  const number = Number(num);
  if (isNaN(number)) return "Некорректное число.";

  const suffixes = [
    {value: 1, name: ""},
    {value: 1e3, name: "тыс."},
    {value: 1e6, name: "млн"},
    {value: 1e9, name: "млрд"},
    {value: 1e12, name: "трлн"}
  ];

  const tier = suffixes?.findLast(s => Math.abs(number) >= s.value) || suffixes[0];

  const scaled = (number / tier.value).toFixed(decimals).replace(/\.?0+$/, "");
  return `${scaled} ${tier.name}`;
};
