export default class Timer {
  private startTime: number;

  public constructor() {
    this.startTime = Date.now();
  }

  public elapsed(): number {
    return Date.now() - this.startTime;
  }
}
