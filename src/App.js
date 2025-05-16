import './App.css';
import GameLayout from './components/Layout/GameLayout'; 
import MenuLayout from './components/Layout/MenuLayout';
import { TimeProvider } from './utils/timeContext';
import { StatsProvider } from './utils/statsContext';

export function MainGameLayout() {
  return (
    <TimeProvider> 
      <StatsProvider initialStats={{
        healthBar: 90,
        oxygenBar: 50,
        hungerBar: 80,
        energyBar: 50,
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



