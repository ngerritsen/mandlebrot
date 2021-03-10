import { debounce, hslToRgb } from "./utils";
import { getMandlebrotInclusion } from "./math";
import Navigation from "./Navigation";
import Stats from "./Stats";
import Timer from "./Timer";
import Canvas from "./Canvas";

const updateDelay = 60;

const stats = new Stats();
const navigation = new Navigation(stats);
const canvas = new Canvas(stats, navigation);

const debouncedDraw = debounce(canvas.draw.bind(canvas), updateDelay);

window.addEventListener("resize", debouncedDraw as EventListener);
navigation.onUpdate(debouncedDraw);
canvas.draw();
