import { debounce, hslToRgb } from "./utils";
import { getMandlebrotInclusion } from "./math";
import * as navigation from "./navigation";
import * as stats from "./stats";

const baseIterations = 100;
const maxIterations = 500;
const updateDelay = 60;
const iterationZoomFactor = 0.01;

const init = () => {
  const debouncedDraw = debounce(draw, updateDelay);

  window.addEventListener("resize", debouncedDraw);
  navigation.onUpdate(debouncedDraw);
  navigation.init();
  draw();
}

const draw = () => {
  const canvas = document.getElementById("canvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stats.setSize(canvas.width, canvas.height);

  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const size = Math.min(canvas.width, canvas.height);
  const zoom = size * navigation.getZoom() / 2;
  const pan = navigation.getPan();
  const iterations = Math.round(Math.min(
    baseIterations + (baseIterations * ((navigation.getZoom() - 1) * iterationZoomFactor)),
    maxIterations
  ));
  const startTime = Date.now();

  stats.setIterations(iterations);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const c = x / zoom - pan.x;
      const ci = y / zoom - pan.y;

      const inclusion = getMandlebrotInclusion(c, ci, iterations);
      const pixelIndex = (y * canvas.width + x) * 4;

      if (inclusion < 5) {
        continue;
      }

      const [r, g, b] = hslToRgb(inclusion * 3 + 30, 1, inclusion * 2.55)

      imageData.data[pixelIndex] = r;
      imageData.data[pixelIndex + 1] = g;
      imageData.data[pixelIndex + 2] = b;
      imageData.data[pixelIndex + 3] = 255;

      ctx.fillStyle = `hsl(${inclusion * 3}, 100%, ${inclusion}%)`;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  stats.setDrawTime(Date.now() - startTime);
}

init();
