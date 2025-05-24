export function mothershipBed(setStats) {
    setStats((prev)=>({
        ...prev,
        energyBar : prev.energyBar + 10,
    }))
    console.log("Sugma1 button");
}

