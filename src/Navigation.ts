import { Pan } from "./types";

const panSensitivity = 0.5;
const zoomSensitivity = 1.7;

export default class Navigation {
  private zoom = 1;
  private pan: Pan = {
    x: 0,
    y: 0,
  };
  private listeners: (() => void)[] = [];

  public constructor() {
    window.addEventListener("keydown", this.navigate.bind(this));
  }

  public onUpdate(callback: () => void): void {
    this.listeners.push(callback);
  }

  public getPan(): Pan {
    return this.pan;
  }

  public getZoom(): number {
    return this.zoom;
  }

  private navigate(event: KeyboardEvent) {
    switch (event.key) {
      case "d":
      case "ArrowRight": {
        this.pan.x += this.getPanFactor();
        break;
      }
      case "a":
      case "ArrowLeft": {
        this.pan.x -= this.getPanFactor();
        break;
      }
      case "w":
      case "ArrowUp": {
        this.pan.y -= this.getPanFactor();
        break;
      }
      case "s":
      case "ArrowDown": {
        this.pan.y += this.getPanFactor();
        break;
      }
      case "=": {
        this.zoom = Math.max(1, this.zoom * zoomSensitivity);
        break;
      }
      case "-": {
        this.zoom = Math.max(1, this.zoom / zoomSensitivity);
        break;
      }
      case "r": {
        this.zoom = 1;
        this.pan.x = 0;
        this.pan.y = 0;
        break;
      }
      default:
        return;
    }

    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  private getPanFactor(): number {
    return panSensitivity * (1 / this.zoom);
  }
}
