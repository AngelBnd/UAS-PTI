export function sugma1(setStats, updActivityMsg) {
    setStats((prev)=>({
        ...prev,
        hungerBar: prev.hungerBar - 6,
    }))
    updActivityMsg("AMONG USSSS");
    console.log("Sugma1 button");
}

export function sugma2(setStats) {
    console.log("Sugma2 button");
}   