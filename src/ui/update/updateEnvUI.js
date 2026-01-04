import { store } from '../../state/store.js';
import { els } from '../dom.js';

export function updateEnvUI() {
    if (!els.engPanel || !els.altInd) return;
    
    els.engPanel.classList.remove('tint-heat', 'tint-cold');
    els.altInd.style.opacity = 0;
    
    Object.values(els.envBtns).forEach(b => {
        if (b) b.classList.remove('active');
    });
    
    if (store.env.temp === 'NORMAL' && store.env.alt === 'NORMAL') {
        if (els.envBtns.basic) els.envBtns.basic.classList.add('active');
    } else {
        if (store.env.temp === 'HIGH') {
            if (els.envBtns.highTemp) els.envBtns.highTemp.classList.add('active');
            els.engPanel.classList.add('tint-heat');
        }
        if (store.env.temp === 'LOW') {
            if (els.envBtns.lowTemp) els.envBtns.lowTemp.classList.add('active');
            els.engPanel.classList.add('tint-cold');
        }
        if (store.env.alt === 'HIGH') {
            if (els.envBtns.highAlt) els.envBtns.highAlt.classList.add('active');
            if (els.altInd) {
                els.altInd.innerText = "HA";
                els.altInd.style.opacity = 1;
            }
        }
        if (store.env.alt === 'LOW') {
            if (els.envBtns.lowAlt) els.envBtns.lowAlt.classList.add('active');
            if (els.altInd) {
                els.altInd.innerText = "LA";
                els.altInd.style.opacity = 1;
            }
        }
    }
}

