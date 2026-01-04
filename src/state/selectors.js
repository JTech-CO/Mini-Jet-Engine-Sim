import { store } from './store.js';
import { CFG } from '../config/simConfig.js';

export function getDensity() {
    let density = 1.0;
    if (store.env.temp === 'HIGH') density *= 0.9;
    if (store.env.temp === 'LOW') density *= 1.1;
    if (store.env.alt === 'HIGH') density *= 0.8;
    if (store.env.alt === 'LOW') density *= 1.05;
    return density;
}

export function getAbActive() {
    return store.sys.abArmed && store.sys.rpm > (CFG.max * 0.95);
}

