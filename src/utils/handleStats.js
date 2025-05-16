export function handleStats(setStats, time) {
    if(time === 0) return;
    setStats(prev => ({
        ...prev,
        hungerBar: Math.max(prev.hungerBar - 1.5, 0),
        oxygenBar: Math.max(prev.hungerBar - 1.5, 0),
        energyBar: Math.max(prev.hungerBar - 2.5, 0),
    }));

}