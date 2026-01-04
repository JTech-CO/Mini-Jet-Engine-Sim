import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { els } from '../dom.js';
import { setTrim, setState } from '../../state/actions.js';

export function initTrim() {
    if (!els.trimUp || !els.trimDown || !els.trimLed) return;
    
    els.trimUp.addEventListener('click', () => {
        if (!store.sys.on || store.sys.state === ST.LOCKOUT) return;
        
        setTrim(true);
        els.trimLed.className = "led bg-green-500 shadow-[0_0_10px_#0f0]";
        
        if (store.sys.state === ST.OFF) {
            setState(ST.READY);
        }
    });
    
    els.trimDown.addEventListener('click', () => {
        setTrim(false);
        els.trimLed.className = "led bg-yellow-900";
        
        if (store.sys.state !== ST.OFF && store.sys.state !== ST.LOCKOUT) {
            setState(ST.COOL);
        }
    });
}

