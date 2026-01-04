export function getStateName(s) {
    const map = [
        "OFF", 
        "READY", 
        "STICK LOW", 
        "GLOW", 
        "START", 
        "IGNITION", 
        "RAMP", 
        "RUNNING", 
        "COOLING", 
        "LOCKOUT"
    ];
    return map[s];
}

