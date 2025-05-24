import React, { useEffect, useState } from 'react';
import './Bars.css';
import { useStats } from '../../utils/statsContext';


const statsConfig = [
  { id: 'healthBar', label: 'Health', statKey: 'health', idx: 1 },
  { id: 'oxygenBar', label: 'Oxygen', statKey: 'oxygen', idx: 1 },
  { id: 'hungerBar', label: 'Hunger', statKey: 'hunger', idx: 2 },
  { id: 'energyBar', label: 'Energy', statKey: 'energy', idx: 2 },
];

const rows = [1, 2];

export default function Bars({ setIsDead }) {  
  const { playerStats, setStats } = useStats();

  useEffect(() => {
    if (
      playerStats.healthBar === 0 ||
      playerStats.hungerBar === 0 ||
      playerStats.oxygenBar === 0 ||
      playerStats.energyBar === 0
    ) setIsDead(true);
      
  }, [playerStats]);

  return (
    <div id="bars">
      {rows.map((row) => (
        <div key={row} className="row rowBars justify-content-center">
          {statsConfig
            .filter((stat) => stat.idx === row)
            .map((stat) => (
              <div
                key={stat.id}
                className="col-6 d-flex flex-column align-items-start mb-2"
              >
                <label htmlFor={stat.id}>{stat.label}</label>
                <progress
                  id={stat.id}
                  value={playerStats[stat.id]}
                  max="100"
                  className="stat-progress"
                ></progress>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
