import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { getAbActive } from '../../state/selectors.js';

export function updateFuel() {
    let consumption = 0.02;
    if (store.sys.priming) consumption = 0.05;
    
    if (getAbActive()) {
        consumption *= 3.0; // AB consumes 3x fuel
    }
    
    if (store.sys.pump > 0.8 || store.sys.priming) {
        store.sys.fuel -= consumption;
    }
    
    if (store.sys.fuel <= 0) {
        store.sys.fuel = 0;
        if (store.sys.state >= ST.IGN) {
            store.sys.state = ST.COOL;
        }
    }
}

export function updateBubbleFactor() {
    if (store.sys.bubbleFactor > 0) {
        store.sys.bubbleFactor -= 0.01;
    }
    if (store.sys.fuel < 20) {
        store.sys.bubbleFactor = Math.max(store.sys.bubbleFactor, 0.5);
    }
}

export function updateBattery() {
    store.sys.batVolts -= 0.00001;
    if (store.sys.pump > 0) {
        store.sys.batVolts -= store.sys.pump * 0.00005;
    }
}

