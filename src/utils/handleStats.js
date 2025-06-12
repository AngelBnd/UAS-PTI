// Made multiple copies for each character

export function handleStatsChar1(setStats, time) {
  if (time === 0) return;
  setStats(prev => {
    const newStats = { ...prev };
    if (time % (4 * 10) === 0) {
      newStats.hungerBar = Math.max(prev.hungerBar - 1, 0);
    }
    if (time % (3 * 10) === 0) {
      newStats.oxygenBar = Math.max(prev.oxygenBar - 1, 0);
    }
    if (time % (3 * 10) === 0) {
      newStats.energyBar = Math.max(prev.energyBar - 1, 0);
    }
    return newStats;
  });
}

export function handleStatsChar2(setStats, time) {
  if (time === 0) return;
  setStats(prev => {
    const newStats = { ...prev };
    if (time % (8 * 10) === 0) {
      newStats.hungerBar = Math.max(prev.hungerBar - 1, 0);
    }
    if (time % (5 * 10) === 0) {
      newStats.oxygenBar = Math.max(prev.oxygenBar - 1, 0);
    }
    if (time % (5 * 10) === 0) {
      newStats.energyBar = Math.max(prev.energyBar - 1, 0);
    }
    return newStats;
  });
}

export function handleStatsChar3(setStats, time) {
  if (time === 0) return;
  setStats(prev => {
    const newStats = { ...prev };
    if (time % (3 * 10) === 0) {
      newStats.hungerBar = Math.max(prev.hungerBar - 1, 0);
    }
    if (time % (6 * 10) === 0) {
      newStats.oxygenBar = Math.max(prev.oxygenBar - 1, 0);
    }
    if (time % (6 * 10) === 0) {
      newStats.energyBar = Math.max(prev.energyBar - 1, 0);
    }
    return newStats;
  });
}
