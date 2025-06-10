export function sugma1(setStats) {
    // Oxygen Surge
    const oxygenBoost = Math.floor(Math.random() * 6) + 5; // +5 to +10
    const energyBonus = Math.floor(Math.random() * 4); // +0 to +3

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenBoost, 100),
        energyBar: Math.min(prev.energyBar + energyBonus, 100),
        hungerBar: Math.max(prev.hungerBar - 2, 0),
    }));

    console.log("Sugma1: Oxygen Surge");
}

export function sugma2(setStats) {
    // Deep Breather
    const oxygenBoost = Math.floor(Math.random() * 4) + 2; // +2 to +5

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenBoost, 100),
        energyBar: Math.max(prev.energyBar - 1, 0),
    }));

    console.log("Sugma2: Deep Breather");
}

export function sugma3(setStats) {
    // Hyper Intake
    const oxygenBoost = Math.floor(Math.random() * 10) + 8; // +8 to +17
    const energyDrop = Math.floor(Math.random() * 4); // -0 to -3

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenBoost, 100),
        energyBar: Math.max(prev.energyBar - energyDrop, 0),
    }));

    console.log("Sugma3: Hyper Intake");
}

export function sugma4(setStats) {
    // Harvest Vapors
    const oxygenCollected = Math.floor(Math.random() * 4) + 3; // +3 to +6
    const energyLoss = Math.floor(Math.random() * 5) + 3; // -3 to -7

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenCollected, 100),
        energyBar: Math.max(prev.energyBar - energyLoss, 0),
    }));

    console.log("Sugma4: Harvest Vapors");
}

export function sugma5(setStats) {
    // Refine Gas Pods
    const oxygenBoost = Math.floor(Math.random() * 5) + 4; // +4 to +8
    const energyBoost = Math.floor(Math.random() * 3) + 2; // +2 to +4

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenBoost, 100),
        energyBar: Math.min(prev.energyBar + energyBoost, 100),
        hungerBar: Math.min(prev.hungerBar + 3, 100),
    }));

    console.log("Sugma5: Refine Gas Pods");
}

export function sugma6(setStats) {
    // Overwork Shift
    const oxygenGain = Math.floor(Math.random() * 8) + 6; // +6 to +13
    const energyDrain = Math.floor(Math.random() * 6) + 5; // -5 to -10
    const healthLoss = Math.floor(Math.random() * 3); // -0 to -2

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenGain, 100),
        energyBar: Math.max(prev.energyBar - energyDrain, 0),
        healthBar: Math.max(prev.healthBar - healthLoss, 0),
    }));

    console.log("Sugma6: Overwork Shift");
}

export function sugma7(setStats) {
    // Storm Exposure
    const oxygenShock = Math.floor(Math.random() * 8) + 2; // +2 to +9
    const healthHit = Math.floor(Math.random() * 4) + 1; // -1 to -4

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + oxygenShock, 100),
        healthBar: Math.max(prev.healthBar - healthHit, 0),
    }));

    console.log("Sugma7: Storm Exposure");
}

export function sugma8(setStats) {
    // Gas Meditation
    const gain = Math.floor(Math.random() * 3) + 1; // +1 to +3

    setStats(prev => ({
        ...prev,
        oxygenBar: Math.min(prev.oxygenBar + gain, 100),
        healthBar: Math.min(prev.healthBar + gain, 100),
        hungerBar: Math.max(prev.hungerBar - gain, 0),
        energyBar: Math.min(prev.energyBar + gain, 100),
    }));

    console.log("Sugma8: Gas Meditation");
}

export function sugma9(setStats) {
    // Pressure Trial
    const energyGain = Math.floor(Math.random() * 5) + 2; // +2 to +6
    const hungerDrop = Math.floor(Math.random() * 3) + 1; // -1 to -3
    const healthRisk = Math.floor(Math.random() * 5); // -0 to -4

    setStats(prev => ({
        ...prev,
        energyBar: Math.min(prev.energyBar + energyGain, 100),
        hungerBar: Math.max(prev.hungerBar - hungerDrop, 0),
        healthBar: Math.max(prev.healthBar - healthRisk, 0),
    }));

    console.log("Sugma9: Pressure Trial");
}
