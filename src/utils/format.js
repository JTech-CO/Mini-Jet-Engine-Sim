export function formatNumber(num) {
    return Math.floor(num).toLocaleString();
}

export function formatVoltage(volts) {
    return volts.toFixed(1) + 'V';
}

export function formatTemperature(temp) {
    return Math.floor(temp) + '°C';
}

export function formatPercent(value) {
    return value + '%';
}

