import { RgbColor } from "./types";

export default class ImageCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private imageData: ImageData;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.imageData = this.context.createImageData(canvas.width, canvas.height);
  }

  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
    this.imageData = this.context.createImageData(width, height);
  }

  public setPixel(x: number, y: number, color: RgbColor): void {
    const pixelIndex = (y * this.canvas.width + x) * 4;

    this.imageData.data[pixelIndex] = color.red;
    this.imageData.data[pixelIndex + 1] = color.green;
    this.imageData.data[pixelIndex + 2] = color.blue;
    this.imageData.data[pixelIndex + 3] = 255;
  }

  public renderImage(): void {
    this.context.putImageData(this.imageData, 0, 0);
  }
}
