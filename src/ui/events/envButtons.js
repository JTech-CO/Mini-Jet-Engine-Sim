import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setEnv } from '../../state/actions.js';
import { applyEnvRules } from '../../sim/environment/envRules.js';
import { updateEnvUI } from '../update/updateEnvUI.js';

export function initEnvButtons() {
    if (!els.envBtns.basic) return;
    
    els.envBtns.basic.addEventListener('click', () => {
        setEnv('NORMAL', 'NORMAL');
        updateEnvUI();
    });
    
    els.envBtns.lowTemp.addEventListener('click', () => {
        const newTemp = store.env.temp === 'LOW' ? 'NORMAL' : 'LOW';
        const result = applyEnvRules(newTemp, store.env.alt);
        setEnv(result.temp, result.alt);
        updateEnvUI();
    });
    
    els.envBtns.highTemp.addEventListener('click', () => {
        const newTemp = store.env.temp === 'HIGH' ? 'NORMAL' : 'HIGH';
        const result = applyEnvRules(newTemp, store.env.alt);
        setEnv(result.temp, result.alt);
        updateEnvUI();
    });
    
    els.envBtns.lowAlt.addEventListener('click', () => {
        const newAlt = store.env.alt === 'LOW' ? 'NORMAL' : 'LOW';
        const result = applyEnvRules(store.env.temp, newAlt);
        setEnv(result.temp, result.alt);
        updateEnvUI();
    });
    
    els.envBtns.highAlt.addEventListener('click', () => {
        const newAlt = store.env.alt === 'HIGH' ? 'NORMAL' : 'HIGH';
        const result = applyEnvRules(store.env.temp, newAlt);
        setEnv(result.temp, result.alt);
        updateEnvUI();
    });
}

