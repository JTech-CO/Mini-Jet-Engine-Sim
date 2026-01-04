import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { CFG } from '../../config/simConfig.js';
import { now } from '../../utils/time.js';

export function updateStateMachine() {
    if (store.sys.state === ST.LOCKOUT) {
        store.sys.targetRpm = 0;
        store.sys.pump = 0;
        return;
    }

    switch (store.sys.state) {
        case ST.OFF:
            store.sys.targetRpm = 0;
            store.sys.pump = store.sys.priming ? 2.5 : 0;
            break;
            
        case ST.READY:
            store.sys.targetRpm = 0;
            if (store.sys.throt > 98) {
                store.sys.state = ST.WAIT;
            }
            break;
            
        case ST.WAIT:
            if (store.sys.throt < 2) {
                store.sys.state = ST.GLOW;
                store.sys.timer = now();
            }
            break;
            
        case ST.GLOW:
            if (now() - store.sys.timer > 2000) {
                store.sys.state = ST.START;
            }
            break;
            
        case ST.START:
            store.sys.targetRpm = 6000;
            if (store.sys.rpm > 2000) {
                store.sys.pump = 0.5;
                if (Math.random() > 0.92) {
                    store.sys.state = ST.IGN;
                    store.sys.egt = 250;
                }
            }
            break;
            
        case ST.IGN:
            store.sys.targetRpm = CFG.startRpm;
            store.sys.pump = 1.0;
            if (store.sys.egt > 350 && store.sys.rpm > 15000) {
                store.sys.state = ST.RAMP;
            }
            break;
            
        case ST.RAMP:
            store.sys.targetRpm = CFG.idle;
            store.sys.pump = 1.5 + (store.sys.rpm / CFG.idle) * 1.5;
            if (store.sys.rpm > CFG.idle - 1000) {
                store.sys.state = ST.RUN;
            }
            break;
            
        case ST.RUN:
            store.sys.targetRpm = CFG.idle + (CFG.max - CFG.idle) * (store.sys.throt / 100);
            store.sys.pump = 2.0 + (store.sys.rpm / CFG.max) * 6.0;
            if (!store.sys.trim) {
                store.sys.state = ST.COOL;
            }
            break;
            
        case ST.COOL:
            store.sys.pump = 0;
            store.sys.targetRpm = 0;
            if (store.sys.egt > 100 && store.sys.rpm < 5000) {
                store.sys.targetRpm = 8000;
                store.sys.pump = 0.1;
            }
            if (store.sys.egt < 60 && store.sys.rpm < 1000) {
                store.sys.state = ST.OFF;
            }
            break;
    }
}

