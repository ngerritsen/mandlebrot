import { round } from "./utils";

export const setDrawTime = (ms) => {
  document.querySelector("[data-draw-time]").textContent = ms + "ms";
}

export const setSize = (width, height) => {
  document.querySelector("[data-draw-size]").textContent = width + "x" + height;
}

export const setZoom = (zoom) => {
  document.querySelector("[data-zoom]").textContent = round(zoom * 100, 2) + "%";
}

export const setPan = (x, y) => {
  document.querySelector("[data-pan]").textContent = `x: ${round(x, 2)}, y: ${round(y, 2)}`;
}

export const setIterations = (n) => {
  document.querySelector("[data-iterations]").textContent = `${n} iterations`;
}