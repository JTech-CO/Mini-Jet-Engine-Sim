import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { els } from '../dom.js';
import { getAbActive } from '../../state/selectors.js';

export function updateIndicators() {
    // Fuel bar and level
    if (els.fuelBar) {
        els.fuelBar.style.width = (store.sys.pump / 8.0 * 100) + "%";
    }
    if (els.fuelLvl) {
        els.fuelLvl.style.height = store.sys.fuel + "%";
    }
    
    // LEDs
    if (els.leds.pwr) {
        els.leds.pwr.className = "led on-green";
    }
    if (els.leds.glow) {
        els.leds.glow.className = store.sys.state === ST.GLOW ? "led on-red" : "led";
    }
    if (els.leds.start) {
        els.leds.start.className = (store.sys.state === ST.START || (store.sys.state === ST.COOL && store.sys.targetRpm > 0)) 
            ? "led on-yellow" 
            : "led";
    }
    if (els.leds.fuel) {
        els.leds.fuel.className = store.sys.pump > 1.0 ? "led on-green" : "led";
    }
}

