export const debounce = (func, ms) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), ms);
  }
}

export const round = (val, decimals) => Math.round(
  val * Math.pow(10, decimals)
) / Math.pow(10, decimals);

export const hslToRgb = (h, s, l) => {
  const a = s * Math.min(l, 1 - l);

  const getValue = (n) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  }

  return [getValue(0), getValue(8), getValue(4)];
}
