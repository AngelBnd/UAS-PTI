import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';
import handleLocationChange from '../../utils/handleLocationChange';
import EjwaArena from './EjwaArena';
import SolezArena from './SolezArena';
import SugmaArena from './SugmaArena';
import KaatiArena from './KaatiArena';
import MothershipArena from './MothershipArena';

export default function GameLayout() {
    const [Location, setLocation] = useState('MainArea');

    return (
        <div className="d-flex" style={{ zIndex: 0 }}>
            <div style={{ flex: '1 1 85%', zIndex: 0 }}>
                <TopPanel/>
                {Location === 'MainArea' && <GameArea setLocation={setLocation}/>}
                {Location === 'Ejwa' && <EjwaArena setLocation={setLocation}/>}
                {Location === 'Solez' && <SolezArena setLocation={setLocation}/>}
                {Location === 'Sugma' && <SugmaArena setLocation={setLocation}/>}
                {Location === 'Kaati' && <KaatiArena setLocation={setLocation}/>}
                {Location === 'Mothership' && <MothershipArena setLocation={setLocation}/>}
            </div>
            <div style={{ flex: '1 1 18%', zIndex: 0 }}>
                <SidePanel/>
            </div>
        </div>
    )
}
