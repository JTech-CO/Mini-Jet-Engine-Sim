import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setBatteryVolts } from '../../state/actions.js';

export function initBattery() {
    if (!els.batteryPack) return;
    
    els.batteryPack.addEventListener('click', () => {
        if (!store.sys.on) return;
        
        if (store.sys.batVolts > 7.0) {
            setBatteryVolts(6.4);
        } else {
            setBatteryVolts(7.6);
        }
    });
}

