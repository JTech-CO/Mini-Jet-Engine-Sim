import { updateParticles } from './canvas/flowParticles.js';
import { drawGraph } from './canvas/graph.js';
import { store } from '../state/store.js';
import { els } from '../ui/dom.js';

let rafId = null;

export function startRafLoop() {
    function loop() {
        updateParticles();
        drawGraph();
        
        // Update pump icon rotation
        if (store.sys.pump > 0 && els.pumpIcon) {
            els.pumpIcon.style.transform = `rotate(${Date.now() * (store.sys.pump / 5)}deg)`;
        }
        
        rafId = requestAnimationFrame(loop);
    }
    
    loop();
}

export function stopRafLoop() {
    if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

