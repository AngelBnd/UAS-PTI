export function handleStats(setStats, time) {
    if(time === 0) return;
    setStats(prev => ({
        ...prev,
        hungerBar: Math.max(prev.hungerBar - 1, 0),
        oxygenBar: Math.max(prev.oxygenBar - 1, 0),
        energyBar: Math.max(prev.energyBar - 1, 0),
    }));
}