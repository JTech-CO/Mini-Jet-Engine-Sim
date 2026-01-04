import { store } from '../../state/store.js';
import { els } from '../dom.js';
import { setAlert, clearAlert as clearAlertAction } from '../../state/actions.js';

export function triggerAlert(type, msg, action) {
    if (store.uiState.alert) return;
    
    setAlert(type);
    
    if (els.alertTitle) els.alertTitle.innerText = type;
    if (els.alertMsg) els.alertMsg.innerText = msg;
    if (els.alertAct) els.alertAct.innerText = "Action: " + action;
    if (els.alertBox) els.alertBox.classList.add('alert-active');
}

export function clearAlert() {
    clearAlertAction();
    if (els.alertBox) els.alertBox.classList.remove('alert-active');
}

