import { HslColor, RgbColor } from "./types";

export function debounce(
  func: (...args) => void,
  ms: number
): (...args) => void {
  let timeout: number;

  return (...args): void => {
    clearTimeout(timeout);
    timeout = Number(setTimeout(() => func(...args), ms));
  };
}

export function round(val: number, decimals: number): number {
  return Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

export function hslToRgb(color: HslColor): RgbColor {
  const a = color.saturation * Math.min(color.lightness, 1 - color.lightness);

  const getValue = (n: number): number => {
    const k = (n + color.hue / 30) % 12;
    return color.lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };

  return {
    red: getValue(0),
    green: getValue(8),
    blue: getValue(4),
  };
}
