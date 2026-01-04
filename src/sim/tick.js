import { store } from '../state/store.js';
import { ST } from '../config/enums.js';
import { calculateDensity } from './environment/density.js';
import { updateStateMachine } from './fsm/stateMachine.js';
import { updateSpool } from './dynamics/spool.js';
import { updateThermal } from './dynamics/thermal.js';
import { updateFuel, updateBubbleFactor, updateBattery } from './dynamics/fuel.js';
import { checkFailures } from './safety/failures.js';
import { updateAfterburner } from './safety/afterburner.js';
import { updateAudio } from '../audio/audioUpdate.js';
import { updateReadouts } from '../ui/update/updateReadouts.js';
import { updateIndicators } from '../ui/update/updateIndicators.js';
import { updateStatus } from '../ui/update/updateStatus.js';
import { updateWiring } from '../render/svg/wiring.js';
import { audioEngine } from '../audio/audioEngine.js';
import { random } from '../utils/rand.js';

let simInterval = null;

export function startSimLoop() {
    if (simInterval) return;
    
    simInterval = setInterval(() => {
        if (!store.sys.on) return;
        
        const density = calculateDensity();
        
        // Audio Trigger Logic
        if ((store.sys.state === ST.GLOW || store.sys.state === ST.START) && random(0, 1) > 0.96) {
            audioEngine.playValve();
        }
        if (store.sys.state === ST.COOL || (store.sys.state === ST.OFF && store.sys.egt > 100)) {
            if (random(0, 1) < (store.sys.egt * 0.0001)) {
                audioEngine.playCooling();
            }
        }
        
        // Failures & Fuel
        updateBubbleFactor();
        updateBattery();
        checkFailures(density);
        
        // State Machine
        updateStateMachine();
        
        // Afterburner
        updateAfterburner();
        
        // Physics
        updateSpool(density);
        updateThermal(density);
        updateFuel();
        
        // UI Updates
        updateReadouts();
        updateStatus();
        updateIndicators();
        updateWiring();
        
        // Audio
        updateAudio();
    }, 50);
}

export function stopSimLoop() {
    if (simInterval) {
        clearInterval(simInterval);
        simInterval = null;
    }
}

