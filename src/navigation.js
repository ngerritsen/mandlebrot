import * as stats from "./stats";

const panSensitivity = 0.5;
const zoomSensitivity = 1.7;

let zoom = 1;
let pan = {
  x: window.innerWidth / window.innerHeight,
  y: 1
};
let listeners = [];

export const init = () => {
  window.addEventListener("keydown", navigate);
  updateStats();
};

export const getZoom = () => zoom;
export const getPan = () => pan;
export const onUpdate = (callback) => listeners.push(callback);

const updateStats = () => {
  stats.setZoom(zoom);
  stats.setPan(pan.x, pan.y);
};

const getPanFactor = () => panSensitivity * (1 / zoom);
const notify = () => listeners.forEach(listener => listener());
const navigate = (event) => {
  switch (event.key) {
    case "ArrowRight": {
      pan.x -= getPanFactor();
      break;
    }
    case "ArrowLeft": {
      pan.x += getPanFactor();
      break;
    }
    case "ArrowUp": {
      pan.y += getPanFactor();
      break;
    }
    case "ArrowDown": {
      pan.y -= getPanFactor();
      break;
    }
    case "=": {
      zoom = Math.max(1, zoom * zoomSensitivity);
      break;
    }
    case "-": {
      zoom = Math.max(1, zoom / zoomSensitivity);
      break;
    }
    case "r": {
      zoom = 1;
      pan.x = window.innerWidth / window.innerHeight;
      pan.y = 1;
      break;
    }
    default: 
      return;
  }

  updateStats();
  notify();
}
