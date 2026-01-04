import { canvases } from '../render/canvas/canvases.js';

export function initResize() {
    window.addEventListener('resize', () => {
        canvases.resizeGraph();
    });
}

