export function handleStats(setPlayerStats) {
    setPlayerStats(prev => ({
    ...prev,
    hungerBar: Math.max(prev.hungerBar - 3, 0),
    oxygenBar: Math.max(prev.hungerBar - 1, 0),
    energyBar: Math.max(prev.hungerBar - 2.5, 0),
    }));

}