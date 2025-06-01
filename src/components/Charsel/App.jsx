import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TitleScreen from './components/TitleScreen';
import Cutscene from './components/Cutscene';
import CharacterSelection from './components/CharacterSelection';
import MainGame from './components/MainGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitleScreen />} />
        <Route path="/cutscene" element={<Cutscene />} />
        <Route path="/character-select" element={<CharacterSelection />} />
        <Route path="/game" element={<MainGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;