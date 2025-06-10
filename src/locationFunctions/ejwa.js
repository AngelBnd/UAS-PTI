export function ejwa1(setStats, setResources, resources, setMessageContent, setMessageTrigger) {
    // Surface Scan - Basic tech discovery
    const energyCost = Math.floor(Math.random() * 4) + 2;
    const techFind = Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0; // 60% chance for 1-3 tech
    
    setStats(prev => ({
        ...prev,
        energyBar: Math.max(prev.energyBar - energyCost, 0)
    }));

    if (techFind > 0) {
        setResources(prev => prev + techFind);
        setMessageContent(`Found ${techFind} alien tech fragments!`);
        setMessageTrigger(prev => prev + 1);
    } else {
        setMessageContent("Scan completed - no tech detected");
        setMessageTrigger(prev => prev + 1);
    }

    console.log("Ejwa1: Surface Scan");
}

export function ejwa2(setStats, setResources, resources, setMessageContent, setMessageTrigger) {
    // Core Tunnel Dive - High risk/reward
    const healthRisk = Math.floor(Math.random() * 12) + 5;
    const energyDrain = Math.floor(Math.random() * 15) + 10;
    const majorFind = Math.random() > 0.3 ? Math.floor(Math.random() * 10) + 5 : 0; // 70% chance for 5-14 tech

    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - healthRisk, 0),
        energyBar: Math.max(prev.energyBar - energyDrain, 0)
    }));

    if (majorFind > 0) {
        setResources(prev => prev + majorFind);
        setMessageContent(`Discovered ancient cache: +${majorFind} tech!`);
    } else {
        setMessageContent("Dangerous collapse! No tech recovered");
    }
    setMessageTrigger(prev => prev + 1);

    console.log("Ejwa2: Core Tunnel Dive");
}

export function ejwa3(setStats, setResources, resources, setMessageContent, setMessageTrigger) {
    // Gravity Well Harvest - Unique to donut planet
    const energyBoost = Math.floor(Math.random() * 8) + 3;
    const techYield = Math.floor(Math.random() * 7) + 4; // 4-10 tech

    setStats(prev => ({
        ...prev,
        energyBar: Math.min(prev.energyBar + energyBoost, 100),
        healthBar: Math.max(prev.healthBar - 2, 0) // Gravity strain
    }));

    setResources(prev => prev + techYield);
    setMessageContent(`Harvested ${techYield} tech from gravity anomalies`);
    setMessageTrigger(prev => prev + 1);

    console.log("Ejwa3: Gravity Well Harvest");
}


export function ejwa5(setStats, setResources, resources, setMessageContent, setMessageTrigger) {
    // Ring Exploration - Balanced option
    const energyCost = Math.floor(Math.random() * 6) + 3;
    const techFound = Math.floor(Math.random() * 8) + 5; // 5-12 tech
    const healthRisk = Math.floor(Math.random() * 4);

    setStats(prev => ({
        ...prev,
        energyBar: Math.max(prev.energyBar - energyCost, 0),
        healthBar: Math.max(prev.healthBar - healthRisk, 0)
    }));

    setResources(prev => prev + techFound);
    setMessageContent(`Collected ${techFound} tech from planetary rings`);
    setMessageTrigger(prev => prev + 1);

    console.log("Ejwa5: Ring Exploration");
}

