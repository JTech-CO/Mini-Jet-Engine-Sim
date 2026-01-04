import { initBootstrapDom } from './bootstrap/initDom.js';
import { initResize } from './bootstrap/initResize.js';
import { initMasterSwitch } from './ui/events/masterSwitch.js';
import { initThrottle } from './ui/events/throttle.js';
import { initTrim } from './ui/events/trim.js';
import { initBattery } from './ui/events/battery.js';
import { initFuelTank } from './ui/events/fuelTank.js';
import { initTestPump } from './ui/events/testPump.js';
import { initAfterburner } from './ui/events/afterburner.js';
import { initGsuGraph } from './ui/events/gsuGraph.js';
import { initEnvButtons } from './ui/events/envButtons.js';
import { updateEnvUI } from './ui/update/updateEnvUI.js';

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM cache and canvases
    initBootstrapDom();
    
    // Initialize resize handler
    initResize();
    
    // Initialize event handlers
    initMasterSwitch();
    initThrottle();
    initTrim();
    initBattery();
    initFuelTank();
    initTestPump();
    initAfterburner();
    initGsuGraph();
    initEnvButtons();
    
    // Initialize environment UI
    updateEnvUI();
});

