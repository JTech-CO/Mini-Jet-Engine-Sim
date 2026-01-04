import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { armAB } from '../../state/actions.js';

export function initAfterburner() {
    if (!els.btnAb) return;
    
    els.btnAb.addEventListener('click', () => {
        const newValue = !store.sys.abArmed;
        armAB(newValue);
        
        if (newValue) {
            els.btnAb.classList.add('active');
        } else {
            els.btnAb.classList.remove('active');
        }
    });
}

