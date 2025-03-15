import {suffixes} from "../constants/suffixes.js";

export const cleanData = (data) => {
  if (!data || typeof data !== "object") return null;

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, formatNumber(value)])
  );
};

export const formatNumber = (value) => {
  if (value === undefined || value === null) return null;

  return String(value).replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");
};

export const formatLargeNumber = (num, decimals = 2) => {
  if (num === undefined || num === null) return "N/A";

  const number = Number(num);
  if (isNaN(number)) return "Некорректное число";

  const tier = suffixes?.findLast(s => Math.abs(number) >= s.value) || suffixes[0];

  const scaled = (number / tier.value).toFixed(decimals).replace(/\.?0+$/, "");
  return `${scaled} ${tier.name}`;
};
