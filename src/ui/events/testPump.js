import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setPriming } from '../../state/actions.js';

export function initTestPump() {
    if (!els.btnTestPump) return;
    
    els.btnTestPump.addEventListener('mousedown', () => {
        if (store.sys.on) {
            setPriming(true);
        }
    });
    
    els.btnTestPump.addEventListener('mouseup', () => {
        setPriming(false);
    });
    
    els.btnTestPump.addEventListener('mouseleave', () => {
        setPriming(false);
    });
}

