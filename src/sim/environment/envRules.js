import { store } from '../../state/store.js';

export function applyEnvRules(temp, alt) {
    // 상호배타 규칙: LOW temp + LOW alt 금지
    if (temp === 'LOW' && alt === 'LOW') {
        if (store.env.temp === 'LOW') {
            alt = 'NORMAL';
        } else {
            temp = 'NORMAL';
        }
    }
    
    // HIGH temp + HIGH alt 금지
    if (temp === 'HIGH' && alt === 'HIGH') {
        if (store.env.temp === 'HIGH') {
            alt = 'NORMAL';
        } else {
            temp = 'NORMAL';
        }
    }
    
    return { temp, alt };
}

