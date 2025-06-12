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
import { CharacterProvider, useChar } from './utils/charContext';
import { InventoryProvider } from './utils/inventoryContext'; // Converted inventory to useContext SHOULDVE BEEN IN THE FIRST PLACE AHEMMMM
import { MothershipProvider } from './utils/mothershipContext';

// Added initial stats for each char
const charInitialStats = [
  {
    healthBar: 75,
    oxygenBar: 65,
    hungerBar: 75,
    energyBar: 75,
  },
  {
    healthBar: 60,
    oxygenBar: 60,
    hungerBar: 60,
    energyBar: 60,
  },
  {
    healthBar: 65,
    oxygenBar: 80,
    hungerBar: 50,
    energyBar: 50,
  },
];

export function MainGameLayout() {
  const { selectedChar } = useChar();
  const currentChar = charInitialStats[selectedChar - 1] || charInitialStats[0];

  return (
    <MothershipProvider>
      <TimeProvider> 
        <StatsProvider initialStats={currentChar}>
          <InventoryProvider>
            <GameLayout/>
          </InventoryProvider>
        </StatsProvider>
      </TimeProvider>
    </MothershipProvider>
  );
}

export function Menu() {
  return (
    <MenuLayout />
  );
}

function App() {
  return (
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
  );
}

export default App;