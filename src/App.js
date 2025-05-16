import './App.css';
import GameLayout from './components/Layout/GameLayout'; 
import MenuLayout from './components/Layout/MenuLayout';
import { TimeProvider } from './utils/timeContext';
import { StatsProvider } from './utils/statsContext';

export function MainGameLayout() {
  return (
    <TimeProvider> 
      <StatsProvider initialStats={{
        healthBar: 70,
        oxygenBar: 100,
        hungerBar: 80,
        energyBar: 90,
      }}>
         <GameLayout/>
      </StatsProvider>
    </TimeProvider>
    
  );
}

export function Menu() {
  return (
    <MenuLayout />
  );
}



