import './Bars.css';
import { useEffect, useRef, useState } from 'react';
import { useTime } from '../../utils/timeContext';
import { handleStats } from '../../utils/handleStats';

const stats = [
  { id: 'healthBar', label: 'Health', idx:1 },
  { id: 'oxygenBar', label: 'Oxygen', idx:1 },
  { id: 'hungerBar', label: 'Hunger', idx:2 },
  { id: 'energyBar', label: 'Energy', idx:2 },
]

const rows = [1,2];

export default function Bars(){
    const barRefs = useRef({});
    const {time} = useTime();
    const [playerStats, setPlayerStats] = useState({
        healthBar: 100,
        oxygenBar: 100,
        hungerBar: 100,
        energyBar: 100,
    });

    
    useEffect(()=>{
        handleStats(setPlayerStats);
    },[time]);

    return(
        <div id="bars">     
            {rows.map((row)=>(
                <div className="row rowBars justify-content-center">
                    {stats
                    .filter(stat => stat.idx === row)
                    .map((stat) => (
                    <div
                        key={stat.id}
                        className="col-6 d-flex flex-column align-items-start mb-2"
                    >
                        <label htmlFor={stat.id}>{stat.label}</label>
                        <progress 
                        id={stat.id} 
                        max="100"
                        value={playerStats[stat.id]}
                        ></progress>
                    </div>
                ))}
            </div>
            ))}
        </div>
    );
}