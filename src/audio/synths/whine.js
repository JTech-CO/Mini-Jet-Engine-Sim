export function createWhine() {
    return new Tone.Oscillator({
        type: "sine",
        volume: -Infinity
    }).toDestination().start();
}

