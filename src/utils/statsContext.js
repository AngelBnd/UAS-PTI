import { createContext, useContext, useState, useEffect } from 'react';
import { useTime } from './timeContext';
import { useChar } from './charContext';

import { handleStatsChar1, handleStatsChar2, handleStatsChar3 } from './handleStats';

const StatsContext = createContext();

export function StatsProvider({ children, initialStats }) {
  const [playerStats, setStats] = useState(initialStats);
  const { time } = useTime();
  const { selectedChar } = useChar();

  useEffect(() => {
    setStats(initialStats);
  }, [initialStats]);

  // Use the proper handleStats for each char
  useEffect(() => {
    switch (selectedChar) {
      case 1:
        handleStatsChar1(setStats, time);
        break;
      case 2:
        handleStatsChar2(setStats, time);
        break;
      case 3:
        handleStatsChar3(setStats, time);
        break;
      default:
        handleStatsChar1(setStats, time);
        break;
    }
    
  }, [time, selectedChar]);

  if (!playerStats) {
    return null;
  }

  return (
    <StatsContext.Provider value={{ playerStats, setStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  return useContext(StatsContext);
}
