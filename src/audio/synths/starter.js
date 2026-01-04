export function createStarter() {
    return new Tone.Oscillator({
        type: "triangle",
        volume: -Infinity
    }).toDestination().start();
}

