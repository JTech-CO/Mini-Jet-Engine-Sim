import { createStarter } from './synths/starter.js';
import { createWhine } from './synths/whine.js';
import { createRoar } from './synths/roarNoise.js';
import { createValve } from './synths/valveClick.js';
import { createCooling } from './synths/coolingTick.js';

export const audioEngine = {
    ctx: null,
    starter: null,
    whine: null,
    roar: null,
    filter: null,
    valve: null,
    metal: null,
    
    async init() {
        await Tone.start();
        this.ctx = true;
        
        this.starter = createStarter();
        this.whine = createWhine();
        const roarData = createRoar();
        this.roar = roarData.roar;
        this.filter = roarData.filter;
        this.valve = createValve();
        this.metal = createCooling();
    },
    
    playValve() {
        if (this.ctx) {
            this.valve.triggerAttackRelease("C2", "32n");
        }
    },
    
    playCooling() {
        if (this.ctx) {
            this.metal.triggerAttackRelease("32n");
        }
    }
};

