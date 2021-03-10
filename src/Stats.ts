import { round } from "./utils";

export default class Stats {
  public setDrawTime(ms: number): void {
    document.querySelector("[data-draw-time]").textContent = ms + "ms";
  }

  public setSize(width: number, height: number): void {
    document.querySelector("[data-draw-size]").textContent =
      width + "x" + height;
  }

  public setZoom(zoom: number): void {
    document.querySelector("[data-zoom]").textContent =
      round(zoom * 100, 2) + "%";
  }

  public setPan(pan: Pan): void {
    document.querySelector("[data-pan]").textContent = `x: ${round(
      pan.x,
      2
    )}, y: ${round(pan.y, 2)}`;
  }

  public setIterations(n: number): void {
    document.querySelector("[data-iterations]").textContent = `${n} iterations`;
  }
}
