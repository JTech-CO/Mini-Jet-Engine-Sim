import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setBubbleFactor } from '../../state/actions.js';

export function initFuelTank() {
    if (!els.fuelTank) return;
    
    els.fuelTank.addEventListener('click', () => {
        if (!store.sys.on) return;
        
        els.fuelTank.classList.add('shaking');
        setBubbleFactor(1.0);
        
        setTimeout(() => {
            els.fuelTank.classList.remove('shaking');
        }, 400);
    });
}

