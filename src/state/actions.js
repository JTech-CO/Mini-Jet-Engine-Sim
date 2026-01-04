import { store } from './store.js';
import { ST } from '../config/enums.js';

export function setThrottle(value) {
    store.sys.throt = value;
}

export function setTrim(value) {
    store.sys.trim = value;
}

export function setEnv(temp, alt) {
    store.env.temp = temp;
    store.env.alt = alt;
}

export function armAB(value) {
    store.sys.abArmed = value;
}

export function setPriming(value) {
    store.sys.priming = value;
}

export function setBubbleFactor(value) {
    store.sys.bubbleFactor = value;
}

export function setState(state) {
    store.sys.state = state;
}

export function setGraphMode(value) {
    store.uiState.graphMode = value;
}

export function setAlert(alert) {
    store.uiState.alert = alert;
}

export function clearAlert() {
    store.uiState.alert = null;
}

export function setBatteryVolts(value) {
    store.sys.batVolts = value;
}

