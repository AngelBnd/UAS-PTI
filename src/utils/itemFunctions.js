export function oxygenTankFunc(setStats){
    setStats((prev)=>({
        ...prev,
        oxygenBar : prev.oxygenBar + 30,
    }))
}

export function airCanFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        oxygenBar : prev.oxygenBar + 15,
    }))
}

export function waterFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        oxygenBar : prev.oxygenBar + 8,
        hungerBar : prev.hungerBar + 5
    }))
}

export function chocoFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        hungerBar : prev.hungerBar + 10,
    }))
}

export function donutFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        hungerBar : prev.hungerBar + 20,
    }))
}

export function sodaFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        hungerBar : prev.hungerBar + 12,
        energyBar : prev.energyBar + 10,
    }))
}

export function coffeeFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        energyBar : prev.energyBar + 30,
    }))
}

export function teaFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        energyBar : prev.energyBar + 15,
    }))
}

export function medkitFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        healthBar : prev.healthBar + 30,
    }))
}

export function bandageFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        healthBar : prev.healthBar + 10,
    }))
}

export function medicineFunc(setStats) {
    setStats((prev)=>({
        ...prev,
        healthBar : prev.healthBar + 15,
    }))
}