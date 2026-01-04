import { ST } from '../config/enums.js';

export const store = {
    sys: {
        on: false,
        state: ST.OFF,
        rpm: 0,
        targetRpm: 0,
        egt: 25,
        pump: 0,
        fuel: 100,
        throt: 0,
        trim: false,
        batVolts: 7.6,
        lastThrot: 0,
        envTemp: 0,
        envAlt: 0,
        priming: false,
        bubbleFactor: 0,
        abArmed: false,
        abActive: false,
        timer: null
    },
    env: {
        temp: 'NORMAL',
        alt: 'NORMAL'
    },
    uiState: {
        graphMode: false,
        alert: null
    },
    graphData: [],
    particles: []
};

