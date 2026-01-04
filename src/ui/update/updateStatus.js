import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { els } from '../dom.js';
import { getStateName } from '../../sim/fsm/stateNames.js';
import { getAbActive } from '../../state/selectors.js';

export function updateStatus() {
    if (!els.status) return;
    
    const abActive = getAbActive();
    els.status.innerText = abActive ? "AFTERBURNER" : getStateName(store.sys.state);
    
    if (store.sys.state === ST.LOCKOUT) {
        els.status.className = "text-red-500 font-black animate-pulse";
    } else if (abActive) {
        els.status.className = "text-blue-400 font-black animate-pulse";
    } else {
        els.status.className = "bg-black/40 rounded py-1 font-bold text-sm text-yellow-300";
    }
}

