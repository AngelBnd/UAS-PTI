import { useEffect } from "react";

export function sugma41(setStats) {
    setStats((prev)=>({
        ...prev,
        hungerBar: prev.hungerBar + 3,
    }))
  
    console.log("Sugma4 button");
}

export function sugma42(setStats) {
    console.log("Sugma4 button");
}   
