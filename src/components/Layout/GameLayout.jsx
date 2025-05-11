import 'bootstrap/dist/css/bootstrap.min.css';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';


export default function GameLayout(){
    return(
    <div className="d-flex">
            <div style={{ flex: '1 1 85%' }}>
                <TopPanel/>
                <GameArea />    
            </div>
            <div style={{ flex: '1 1 18%' }}>
                <SidePanel/>
            </div>
    </div>
    )
}

