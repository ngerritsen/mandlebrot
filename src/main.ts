import { debounce } from "./utils";
import Navigation from "./Navigation";
import Visualization from "./Visualization";
import ImageCanvas from "./ImageCanvas";

const updateDelay = 60;

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const imageCanvas = new ImageCanvas(canvas);
const navigation = new Navigation();
const visualization = new Visualization(navigation, imageCanvas);

const debouncedDraw = debounce(
  visualization.draw.bind(visualization),
  updateDelay
);

window.addEventListener("resize", debouncedDraw as EventListener);
navigation.onUpdate(debouncedDraw);
visualization.draw();
