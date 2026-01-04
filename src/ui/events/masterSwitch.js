import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { audioEngine } from '../../audio/audioEngine.js';
import { startSimLoop } from '../../sim/tick.js';
import { startRafLoop } from '../../render/rafLoop.js';

export function initMasterSwitch() {
    if (!els.btnMaster) return;
    
    els.btnMaster.addEventListener('click', async function() {
        if (!store.sys.on) {
            store.sys.on = true;
            await audioEngine.init();
            this.classList.remove('bg-red-700');
            this.classList.add('bg-green-600');
            this.innerHTML = "ACTIVE";
            startSimLoop();
            startRafLoop();
        }
    });
}

