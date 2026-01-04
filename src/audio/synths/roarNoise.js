export function createRoar() {
    const noise = new Tone.Noise("pink").start();
    const filter = new Tone.Filter(200, "lowpass").toDestination();
    const roar = noise.connect(filter);
    roar.volume.value = -Infinity;
    return { roar, filter };
}

