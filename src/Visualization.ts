import Timer from "./Timer";
import * as stats from "./stats";
import Navigation from "./Navigation";
import { getMandlebrotInclusion } from "./math";
import { hslToRgb } from "./utils";
import { RgbColor } from "./Types";

const baseIterations = 120;
const maxIterations = 500;
const iterationZoomFactor = 0.001;

export default class Visualization {
  private navigation: Navigation;
  private canvas: HTMLCanvasElement;

  public constructor(navigation: Navigation, canvas: HTMLCanvasElement) {
    this.navigation = navigation;
    this.canvas = canvas;
  }

  public draw(): void {
    const timer = new Timer();
    const { innerWidth: width, innerHeight: height } = window;
    const size = Math.min(width, height);
    const zoom = (size * this.navigation.getZoom()) / 2;
    const pan = this.navigation.getPan();
    const iterations = this.getIterations();
    const ctx = this.canvas.getContext("2d");
    const imageData = ctx.createImageData(width, height);
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    this.canvas.width = width;
    this.canvas.height = height;

    stats.setSize(width, height);
    stats.setIterations(iterations);

    let pixelIndex = 0;

    for (let y = 0; y < height; y++) {
      const ci = (y - halfHeight) / zoom + pan.y;

      for (let x = 0; x < width; x++) {
        const c = (x - halfWidth) / zoom + pan.x;
        const inclusion = getMandlebrotInclusion(c, ci, iterations);
        const color = this.createColor(inclusion);

        imageData.data[pixelIndex++] = color.red;
        imageData.data[pixelIndex++] = color.green;
        imageData.data[pixelIndex++] = color.blue;
        imageData.data[pixelIndex++] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    stats.setDrawTime(timer.elapsed());
  }

  private createColor(inclusion: number): RgbColor {
    return hslToRgb({
      hue: inclusion * 4 + 30,
      saturation: 1,
      lightness: inclusion * 2.55,
    });
  }

  private getIterations(): number {
    return Math.round(
      Math.min(
        baseIterations +
          baseIterations *
            ((this.navigation.getZoom() - 1) * iterationZoomFactor),
        maxIterations
      )
    );
  }
}
