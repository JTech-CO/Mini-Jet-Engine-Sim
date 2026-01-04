export function createCooling() {
    const metal = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.03, sustain: 0 },
        volume: -5
    }).toDestination();
    
    const metalFilter = new Tone.Filter(3000, "highpass").toDestination();
    metal.connect(metalFilter);
    
    return metal;
}

