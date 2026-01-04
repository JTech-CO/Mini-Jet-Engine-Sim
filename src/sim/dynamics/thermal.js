import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { CFG } from '../../config/simConfig.js';
import { getAbActive } from '../../state/selectors.js';

export function updateThermal(density) {
    let targetT = 25;
    
    if (store.sys.state >= ST.IGN && store.sys.state <= ST.RUN) {
        const coolingFactor = density;
        targetT = 300 + (store.sys.rpm / CFG.max) * 450 * (1.5 - coolingFactor * 0.5);
        
        // Afterburner Heat
        if (getAbActive()) {
            targetT += 200;
        }
    }
    
    if (store.sys.state === ST.GLOW) {
        targetT = 100;
    }
    
    if (store.sys.egt < targetT) {
        store.sys.egt += 3;
    } else {
        store.sys.egt -= 1;
    }
}

