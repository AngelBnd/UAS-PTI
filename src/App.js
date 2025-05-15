import './App.css';
import GameLayout from './components/Layout/GameLayout'; 
import MenuLayout from './components/Layout/MenuLayout';
import { TimeProvider } from './utils/timeContext';

export function MainGameLayout() {
  return (
    <TimeProvider> 
      <GameLayout/>
    </TimeProvider>
    
  );
}

export function Menu() {
  return (
    <MenuLayout />
  );
}



