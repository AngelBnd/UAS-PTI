import './App.css';
import GameLayout from './components/Layout/GameLayout'; 
import MenuLayout from './components/Layout/MenuLayout';

export function MainGameLayout() {
  return (
    <GameLayout />
  );
}

export function Menu() {
  return (
    <MenuLayout />
  );
}



