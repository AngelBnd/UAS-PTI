export function solez1(setStats, setResources,resources,setMessageContent,setMessageTrigger) {
    // Mineral Jackpot
    const mineralGain = Math.floor(Math.random() * 15) + 10;
    const healthRisk = Math.floor(Math.random() * 5);
    const crystalChance = Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 20 : 0;

    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - healthRisk, 0),
        energyBar: Math.max(prev.energyBar - 3, 0)
    }));

    if (crystalChance > 0) {
        setResources(prev => prev + crystalChance);
    }

    console.log("Solez1: Mineral Jackpot");
}

export function solez2(setStats,setResources,resources,setMessageContent,setMessageTrigger) {
    // Deep Core Drill
    const severeRisk = Math.floor(Math.random() * 10) + 5;
    
    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - severeRisk, 0),
        energyBar: Math.max(prev.energyBar - 8, 0)
    }));
    setResources(prev => prev + 20);

    console.log("Solez2: Deep Core Drill");
}

export function solez3(setStats,setResources,resources,setMessageContent,setMessageTrigger) {
    // Safe Extraction
    const energyCost = Math.floor(Math.random() * 3) + 1;

    setStats(prev => ({
        ...prev,
        energyBar: Math.max(prev.energyBar - energyCost, 0)
    }));

    console.log("Solez3: Safe Extraction");
}

export function solez4(setStats, setResources,resources,setMessageContent,setMessageTrigger) {
    // Cave-In Survival
    const healthDanger = Math.floor(Math.random() * 15) + 5;
    const energyDrain = Math.floor(Math.random() * 10) + 5;
    const crystalFind = Math.random() > 0.5 ? Math.floor(Math.random() * 13) + 8 : 0;

    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - healthDanger, 0),
        energyBar: Math.max(prev.energyBar - energyDrain, 0)
    }));

    if (crystalFind > 0) {
        setResources(prev => prev + crystalFind);
    }

    console.log("Solez4: Cave-In Survival");
}

export function solez5(setStats, setResources,resources,setMessageContent,setMessageTrigger) {
    // Crystal Harvest
    const healthCost = Math.floor(Math.random() * 3);
    const bonusCrystals = Math.floor(Math.random() * 13) + 8;

    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - healthCost, 0),
        energyBar: Math.min(prev.energyBar + 1, 100)
    }));

    setResources(prev => prev + bonusCrystals);
    console.log("Solez5: Crystal Harvest");
}

export function solez6(setStats,setResources,resources,setMessageContent,setMessageTrigger) {
    // Tectonic Fracture
    const criticalDamage = Math.floor(Math.random() * 25) + 10;

    setStats(prev => ({
        ...prev,
        healthBar: Math.max(prev.healthBar - criticalDamage, 0),
        energyBar: 0
    }));

    console.log("Solez6: Tectonic Fracture");
}

export function solez7(setStats,setResources,resources,setMessageContent,setMessageTrigger) {
    // Prospector's Luck
    const findChance = Math.random();
    
    if (findChance > 0.3) {
        setStats(prev => ({
            ...prev,
            energyBar: Math.max(prev.energyBar - 2, 0)
        }));
    } else {
        setStats(prev => ({
            ...prev,
            healthBar: Math.max(prev.healthBar - 1, 0),
            energyBar: Math.max(prev.energyBar - 2, 0)
        }));
    }

    console.log("Solez7: Prospector's Luck");
}

export function solez8(setStats, setResources,resources,setMessageContent,setMessageTrigger) {
    // Miner's Respite
    const healthRecover = Math.floor(Math.random() * 8) + 3;
    const energyRecover = Math.floor(Math.random() * 12) + 5;
    const crystalCost = Math.floor(Math.random() * 5) + 3;

    let neededResources = resources - crystalCost;
    if(neededResources<0){
        setMessageContent(`Need ${Math.abs(neededResources)} more resources!`);
        setMessageTrigger(prev=>prev+1);
        return;
    }

    setStats(prev => ({
        ...prev,
        healthBar: Math.min(prev.healthBar + healthRecover, 100),
        energyBar: Math.min(prev.energyBar + energyRecover, 100)
    }));

    setResources(prev => Math.max(prev - crystalCost, 0));
    console.log("Solez8: Miner's Respite");
}