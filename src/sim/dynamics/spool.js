import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { random } from '../../utils/rand.js';

export function updateSpool(density) {
    const diff = store.sys.targetRpm - store.sys.rpm;
    let spoolRate = 0.05 * density;
    
    if (diff > 0 && store.sys.state === ST.RUN) {
        spoolRate = 0.08 * density;
    }
    
    // Bubble factor 변동
    if (store.sys.bubbleFactor > 0.1 && store.sys.state >= ST.IGN) {
        store.sys.rpm += (random(-0.5, 0.5)) * store.sys.bubbleFactor * 2000;
    }
    
    store.sys.rpm += diff * spoolRate;
    if (store.sys.rpm < 0) store.sys.rpm = 0;
}

