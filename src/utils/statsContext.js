import { createContext, useContext, useState, useEffect } from 'react';
import { useTime } from './timeContext';
import { handleStats } from './handleStats';
import { useRef } from 'react';


const StatsContext = createContext();

export function StatsProvider({children, initialStats}){
    const[playerStats, setStats] = useState(initialStats);
    const {time} = useTime();
    // const isFirst = useRef(true);
    

    useEffect(()=>{
        handleStats(setStats, time);
    },[time]);
    

    return(
        <StatsContext.Provider value={{playerStats, setStats}}>
            {children}
        </StatsContext.Provider>
    );
}

export function useStats(){
    return useContext(StatsContext);
}