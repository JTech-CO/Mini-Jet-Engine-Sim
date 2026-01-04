import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { formatNumber, formatVoltage, formatTemperature } from '../../utils/format.js';

export function updateReadouts() {
    if (!store.uiState.graphMode) {
        if (els.rpm) els.rpm.innerText = formatNumber(store.sys.rpm);
        if (els.egt) els.egt.innerText = formatTemperature(store.sys.egt);
        if (els.pump) els.pump.innerText = formatVoltage(store.sys.pump);
    }
    
    if (els.bat) els.bat.innerText = formatVoltage(store.sys.batVolts);
}

