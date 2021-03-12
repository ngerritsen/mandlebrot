import { Pan } from "./types";
import { round } from "./utils";

export function setDrawTime(ms: number): void {
  document.querySelector("[data-draw-time]").textContent = ms + "ms";
}

export function setSize(width: number, height: number): void {
  document.querySelector("[data-draw-size]").textContent = width + "x" + height + "px";
}

export function setZoom(zoom: number): void {
  document.querySelector("[data-zoom]").textContent = "x" + round(zoom, zoom >= 10 ? 0 : 1);
}

export function setPan(pan: Pan): void {
  document.querySelector("[data-pan]").textContent = `x: ${round(
    pan.x,
    2
  )}, y: ${round(pan.y, 2)}`;
}

export function setIterations(n: number): void {
  document.querySelector("[data-iterations]").textContent = `${n} iterations`;
}
