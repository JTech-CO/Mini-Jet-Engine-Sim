export function createValve() {
    return new Tone.MembraneSynth({
        pitchDecay: 0.05,
        octaves: 4,
        oscillator: { type: "sine" },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
        volume: -5
    }).toDestination();
}

