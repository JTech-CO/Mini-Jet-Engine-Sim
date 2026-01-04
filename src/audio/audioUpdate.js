import { audioEngine } from './audioEngine.js';
import { store } from '../state/store.js';
import { ST } from '../config/enums.js';
import { CFG } from '../config/simConfig.js';
import { random } from '../utils/rand.js';
import { getAbActive } from '../state/selectors.js';

export function updateAudio() {
    if (!audioEngine.ctx) return;
    
    // Bubbles pitch fluctuation
    let basePitch = 2000 + store.sys.rpm / 30;
    if (store.sys.bubbleFactor > 0.1 && store.sys.rpm > 10000) {
        basePitch += (random(-0.5, 0.5)) * 500;
    }
    
    // Engine Running Sounds
    if (store.sys.state === ST.START || (store.sys.state === ST.COOL && store.sys.pump > 0)) {
        audioEngine.starter.frequency.rampTo(100 + store.sys.rpm / 100, 0.1);
        audioEngine.starter.volume.rampTo(-15, 0.1);
    } else {
        audioEngine.starter.volume.rampTo(-Infinity, 0.5);
    }
    
    // Roar Volume & Filter
    if (store.sys.egt > 150) {
        let vol = -40 + (store.sys.rpm / CFG.max) * 30;
        if (getAbActive()) vol += 5; // Louder on AB
        
        audioEngine.roar.volume.rampTo(vol, 0.1);
        
        let filterFreq = 200 + store.sys.rpm / 20;
        if (getAbActive()) filterFreq += 2000; // Open filter more for AB
        audioEngine.filter.frequency.rampTo(filterFreq, 0.1);
    } else {
        audioEngine.roar.volume.rampTo(-Infinity, 1);
    }
    
    if (store.sys.rpm > 10000) {
        let vol = -60 + (store.sys.rpm / CFG.max) * 50;
        audioEngine.whine.volume.rampTo(vol, 0.1);
        audioEngine.whine.frequency.rampTo(basePitch, 0.1);
    } else {
        audioEngine.whine.volume.rampTo(-Infinity, 0.5);
    }
    
    // Priming Sound
    if (store.sys.priming) {
        audioEngine.starter.frequency.rampTo(200, 0.1);
        audioEngine.starter.volume.rampTo(-20, 0.1);
    }
}

