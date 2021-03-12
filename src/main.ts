import { debounce } from "./utils";
import Navigation from "./Navigation";
import Visualization from "./Visualization";
import Modal from "./Modal";

const updateDelay = 60;

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const navigation = new Navigation();
const visualization = new Visualization(navigation, canvas);

document.querySelectorAll("[data-modal-trigger]").forEach(element => new Modal(element));

const debouncedDraw = debounce(
  visualization.draw.bind(visualization),
  updateDelay
);

window.addEventListener("resize", debouncedDraw as EventListener);
navigation.onUpdate(debouncedDraw);
visualization.draw();
