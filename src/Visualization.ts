import Timer from "./Timer";
import * as stats from "./stats";
import Navigation from "./Navigation";
import { getMandlebrotInclusion } from "./math";
import { hslToRgb } from "./utils";
import ImageCanvas from "./ImageCanvas";
import { RgbColor } from "./Types";

const baseIterations = 100;
const maxIterations = 500;
const iterationZoomFactor = 0.01;

export default class Visualization {
  private navigation: Navigation;
  private imageCanvas: ImageCanvas;

  public constructor(navigation: Navigation, imageCanvas: ImageCanvas) {
    this.navigation = navigation;
    this.imageCanvas = imageCanvas;
  }

  public draw(): void {
    const timer = new Timer();
    const { innerWidth: width, innerHeight: height } = window;
    const size = Math.min(width, height);
    const zoom = (size * this.navigation.getZoom()) / 2;
    const pan = this.navigation.getPan();
    const iterations = this.getIterations();

    this.imageCanvas.setSize(width, height);
    stats.setSize(width, height);
    stats.setIterations(iterations);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const c = (x - width / 2) / zoom + pan.x;
        const ci = (y - height / 2) / zoom + pan.y;

        const inclusion = getMandlebrotInclusion(c, ci, iterations);

        if (inclusion < 5) {
          continue;
        }

        this.imageCanvas.setPixel(x, y, this.createColor(inclusion));
      }
    }

    this.imageCanvas.renderImage();
    stats.setDrawTime(timer.elapsed());
  }

  private createColor(inclusion: number): RgbColor {
    return hslToRgb({
      hue: inclusion * 3 + 30,
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
