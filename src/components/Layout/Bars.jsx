import './Bars.css';
import { useEffect, useRef, useState } from 'react';
import { useTime } from '../../utils/timeContext';
import { useStats } from '../../utils/statsContext';

const stats = [
  { id: 'healthBar', label: 'Health', idx:1 },
  { id: 'oxygenBar', label: 'Oxygen', idx:1 },
  { id: 'hungerBar', label: 'Hunger', idx:2 },
  { id: 'energyBar', label: 'Energy', idx:2 },
]

const rows = [1,2];

export default function Bars(){
    const{playerStats} = useStats();

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