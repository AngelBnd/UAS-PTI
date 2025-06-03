import { useEffect } from "react";

export function sugma1(setStats) {
    setStats((prev)=>({
        ...prev,
        hungerBar: prev.hungerBar + 3,
    }))
  
    console.log("Sugma1 button");
}

export function sugma2(setStats) {
    console.log("Sugma2 button");
}   
