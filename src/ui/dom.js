import { DOM_IDS } from '../config/domIds.js';

export const els = {
    rpm: null,
    egt: null,
    pump: null,
    bat: null,
    status: null,
    throt: null,
    fuelBar: null,
    fuelLvl: null,
    pumpIcon: null,
    fuelTank: null,
    leds: {
        pwr: null,
        glow: null,
        start: null,
        fuel: null
    },
    wires: {
        rx: null,
        gsu: null,
        start: null,
        pump: null
    },
    textMode: null,
    graphMode: null,
    btnGraph: null,
    alertBox: null,
    alertTitle: null,
    alertMsg: null,
    alertAct: null,
    engPanel: null,
    altInd: null,
    envBtns: {
        basic: null,
        lowTemp: null,
        highTemp: null,
        lowAlt: null,
        highAlt: null
    },
    btnTestPump: null,
    btnAb: null,
    btnMaster: null,
    trimUp: null,
    trimDown: null,
    trimLed: null,
    batteryPack: null
};

export function initDom() {
    els.rpm = document.getElementById(DOM_IDS.gsuRpm);
    els.egt = document.getElementById(DOM_IDS.gsuEgt);
    els.pump = document.getElementById(DOM_IDS.gsuPump);
    els.bat = document.getElementById(DOM_IDS.gsuBat);
    els.status = document.getElementById(DOM_IDS.gsuStatus);
    els.throt = document.getElementById(DOM_IDS.throttleDisp);
    els.fuelBar = document.getElementById(DOM_IDS.fuelBar);
    els.fuelLvl = document.getElementById(DOM_IDS.fuelLiquid);
    els.pumpIcon = document.getElementById(DOM_IDS.iconPump);
    els.fuelTank = document.getElementById(DOM_IDS.fuelTankContainer);
    
    els.leds.pwr = document.getElementById(DOM_IDS.ledPwr);
    els.leds.glow = document.getElementById(DOM_IDS.ledGlow);
    els.leds.start = document.getElementById(DOM_IDS.ledStart);
    els.leds.fuel = document.getElementById(DOM_IDS.ledFuel);
    
    els.wires.rx = document.getElementById(DOM_IDS.wRx);
    els.wires.gsu = document.getElementById(DOM_IDS.wGsu);
    els.wires.start = document.getElementById(DOM_IDS.wEng);
    els.wires.pump = document.getElementById(DOM_IDS.wPump);
    
    els.textMode = document.getElementById(DOM_IDS.gsuTextMode);
    els.graphMode = document.getElementById(DOM_IDS.gsuGraphMode);
    els.btnGraph = document.getElementById(DOM_IDS.btnGraph);
    
    els.alertBox = document.getElementById(DOM_IDS.alertBox);
    els.alertTitle = document.getElementById(DOM_IDS.alertTitle);
    els.alertMsg = document.getElementById(DOM_IDS.alertMsg);
    els.alertAct = document.getElementById(DOM_IDS.alertAction);
    
    els.engPanel = document.getElementById(DOM_IDS.enginePanel);
    els.altInd = document.getElementById(DOM_IDS.envAltIndicator);
    
    els.envBtns.basic = document.getElementById(DOM_IDS.envBasic);
    els.envBtns.lowTemp = document.getElementById(DOM_IDS.envLowTemp);
    els.envBtns.highTemp = document.getElementById(DOM_IDS.envHighTemp);
    els.envBtns.lowAlt = document.getElementById(DOM_IDS.envLowAlt);
    els.envBtns.highAlt = document.getElementById(DOM_IDS.envHighAlt);
    
    els.btnTestPump = document.getElementById(DOM_IDS.btnTestPump);
    els.btnAb = document.getElementById(DOM_IDS.btnAb);
    els.btnMaster = document.getElementById(DOM_IDS.btnMaster);
    els.trimUp = document.getElementById(DOM_IDS.trimUp);
    els.trimDown = document.getElementById(DOM_IDS.trimDown);
    els.trimLed = document.getElementById(DOM_IDS.trimLed);
    els.batteryPack = document.getElementById(DOM_IDS.batteryPack);
}

