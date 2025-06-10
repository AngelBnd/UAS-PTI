import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GameLayout from './components/Layout/GameLayout'; 
import MenuLayout from './components/Layout/MenuLayout';

import TitleScreen from './components/Layout/TitleScreen';
import CharacterSelection from './components/Layout/Charsel';
import Cutscene from './components/Layout/Cutscene';

import { TimeProvider } from './utils/timeContext';
import { StatsProvider } from './utils/statsContext';
import { CharacterProvider } from './utils/charContext';
import { InventoryProvider } from './utils/inventoryContext'; // Converted inventory to useContext SHOULDVE BEEN IN THE FIRST PLACE AHEMMMM

export function MainGameLayout() {
  return (
    <TimeProvider> 
      <StatsProvider initialStats={{
        healthBar: 90,
        oxygenBar: 50,
        hungerBar: 20,
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

function App() {
  return (
    <InventoryProvider>
      <CharacterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitleScreen />} />
            <Route path="/cutscene" element={<Cutscene />} />
            <Route path="/character-select" element={<CharacterSelection />} />
            <Route path="/game" element={<MainGameLayout />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </BrowserRouter>
      </CharacterProvider>
    </InventoryProvider>
  );
}

export default App;