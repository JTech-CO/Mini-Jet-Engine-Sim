import { store } from '../../state/store.js';
import { ST } from '../../config/enums.js';
import { triggerAlert, clearAlert } from '../../ui/update/alertUI.js';
import { setState } from '../../state/actions.js';

export function checkFailures(density) {
    // Low Battery Check
    if (store.sys.batVolts < 6.5 && store.sys.state !== ST.LOCKOUT) {
        setState(ST.LOCKOUT);
        triggerAlert("LOW BATTERY", "Voltage below 6.5V. ECU Lockout.", "Click Battery to Reconnect");
    }
    
    if (store.sys.state === ST.LOCKOUT && store.sys.batVolts >= 7.0) {
        setState(ST.OFF);
        clearAlert();
    }
    
    // Flameout Check
    const delta = store.sys.throt - store.sys.lastThrot;
    if (store.sys.state === ST.RUN && delta < -40 && store.sys.rpm > 80000) {
        let risk = 0.7;
        if (density < 0.9) risk = 0.5;
        
        if (Math.random() > risk) {
            setState(ST.COOL);
            store.sys.egt -= 100;
            triggerAlert("FLAMEOUT", "Rapid Throttle Drop Detected", "Stick Down & Trim Down to Reset");
        }
    }
    store.sys.lastThrot = store.sys.throt;
    
    // Hot Start Check
    if (store.sys.state === ST.IGN && store.sys.egt > 700) {
        if (Math.random() > 0.90) {
            store.sys.egt += 50;
            if (store.sys.egt > 850) {
                setState(ST.COOL);
                triggerAlert("HOT START", "EGT Exceeded 850°C", "TRIM DOWN IMMEDIATELY");
            }
        }
    }
    
    // Clear alerts on recovery
    if (store.uiState.alert === "FLAMEOUT" && store.sys.throt < 5 && !store.sys.trim) {
        clearAlert();
    }
    if (store.uiState.alert === "HOT START" && !store.sys.trim) {
        clearAlert();
    }
}

