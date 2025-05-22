export function oxygenTankFunc(setStats){
    setStats((prev)=>({
        ...prev,
        oxygenBar : prev.oxygenBar + 10,
    }))
}