import Timer from "./Timer";
import Stats from "./Stats";
import Navigation from "./Navigation";
import { getMandlebrotInclusion } from "./math";
import { hslToRgb } from "./utils";

const baseIterations = 100;
const maxIterations = 500;
const iterationZoomFactor = 0.01;

export default class Canvas {
  private stats: Stats;
  private navigation: Navigation;

  public constructor(stats: Stats, navigation: Navigation) {
    this.stats = stats;
    this.navigation = navigation;
  }

  public draw(): void {
    const timer = new Timer();
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    this.stats.setSize(canvas.width, canvas.height);
  
    const ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const size = Math.min(canvas.width, canvas.height);
    const zoom = (size * this.navigation.getZoom()) / 2;
    const pan = this.navigation.getPan();
    const iterations = this.getIterations();
  
    this.stats.setIterations(iterations);
  
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        const c = x / zoom - pan.x;
        const ci = y / zoom - pan.y;

        const inclusion = getMandlebrotInclusion(c, ci, iterations);
        const pixelIndex = (y * canvas.width + x) * 4;
  
        if (inclusion < 5) {
          continue;
        }
  
        const color = hslToRgb({
          hue: inclusion * 3 + 30,
          saturation: 1,
          lightness: inclusion * 2.55
        });
  
        this.setPixel(imageData, pixelIndex, color);
      }
    }
  
    ctx.putImageData(imageData, 0, 0);
  
    this.stats.setDrawTime(timer.elapsed());
  }

  private setPixel(imageData: ImageData, pixelIndex: number, color: RgbColor): void {
    imageData.data[pixelIndex] = color.red;
    imageData.data[pixelIndex + 1] = color.green;
    imageData.data[pixelIndex + 2] = color.blue;
    imageData.data[pixelIndex + 3] = 255;
  }

  private getIterations(): number {
    return Math.round(
      Math.min(
        baseIterations +
          baseIterations * ((this.navigation.getZoom() - 1) * iterationZoomFactor),
        maxIterations
      )
    );
  }
}