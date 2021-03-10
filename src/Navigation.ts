import Stats from "./Stats";

export default class Navigation {
  private readonly panSensitivity: number = 0.5;
  private readonly zoomSensitivity: number = 1.7;
  private zoom: number = 1;
  private pan: Pan = {
    x: window.innerWidth / window.innerHeight,
    y: 1,
  };
  private listeners: Function[] = [];
  private stats: Stats;

  public constructor(stats: Stats) {
    this.stats = stats;
    window.addEventListener("keydown", this.navigate.bind(this));
    this.updateStats();
  }

  public onUpdate(callback: Function): void {
    this.listeners.push(callback);
  }

  public getPan(): Pan {
    return this.pan;
  }

  public getZoom(): number {
    return this.zoom;
  }

  private navigate(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowRight": {
        this.pan.x -= this.getPanFactor();
        break;
      }
      case "ArrowLeft": {
        this.pan.x += this.getPanFactor();
        break;
      }
      case "ArrowUp": {
        this.pan.y += this.getPanFactor();
        break;
      }
      case "ArrowDown": {
        this.pan.y -= this.getPanFactor();
        break;
      }
      case "=": {
        this.zoom = Math.max(1, this.zoom * this.zoomSensitivity);
        break;
      }
      case "-": {
        this.zoom = Math.max(1, this.zoom / this.zoomSensitivity);
        break;
      }
      case "r": {
        this.zoom = 1;
        this.pan.x = window.innerWidth / window.innerHeight;
        this.pan.y = 1;
        break;
      }
      default:
        return;
    }

    this.notify();
    this.updateStats();
  }

  private notify(): void {
    this.listeners.forEach((listener: Function) => listener());
  }

  private getPanFactor(): number {
    return this.panSensitivity * (1 / this.zoom);
  }

  private updateStats(): void {
    this.stats.setZoom(this.zoom);
    this.stats.setPan(this.pan);
  }
}
