import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setThrottle } from '../../state/actions.js';
import { formatPercent } from '../../utils/format.js';

export function initThrottle() {
    const throttleInput = document.getElementById('throttle-input');
    if (!throttleInput) return;
    
    throttleInput.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        setThrottle(value);
        if (els.throt) {
            els.throt.innerText = formatPercent(value);
        }
    });
}

