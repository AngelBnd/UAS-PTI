import React, { useEffect, useState } from 'react';
import './Bars.css';
import DeathBar from './Deathbar'; 

const statsConfig = [
  { id: 'healthBar', label: 'Health', statKey: 'health', idx: 1 },
  { id: 'oxygenBar', label: 'Oxygen', statKey: 'oxygen', idx: 1 },
  { id: 'hungerBar', label: 'Hunger', statKey: 'hunger', idx: 2 },
  { id: 'energyBar', label: 'Resources', statKey: 'resources', idx: 2 },
];

const rows = [1, 2];

export default function Bars({ onGameOver }) {
  const [stats, setStats] = useState({
    health: 80,
    hunger: 75,
    oxygen: 90,
    resources: 20,
  });

  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        health: Math.max(0, prev.health - 3),
        hunger: Math.max(0, prev.hunger - 5),
        oxygen: Math.max(0, prev.oxygen - 4),
        resources: Math.max(0, prev.resources - 2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      stats.health === 0 ||
      stats.hunger === 0 ||
      stats.oxygen === 0 ||
      stats.resources === 0
    ) {
      setIsDead(true);
    }
  }, [stats]);

  if (isDead) {
    return <DeathBar onRestart={() => window.location.reload()} />;
  }

  return (
    <div id="bars">
      <h3>Status Player</h3>
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
                  value={stats[stat.statKey]}
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
