import 'bootstrap/dist/css/bootstrap.min.css';
import GameArea from './GameArea';
import TopPanel from './TopPanel';
import SidePanel from './SidePanel';


export default function GameLayout(){
    return(
    <div className="d-flex" style={{ zIndex :-10000000000 }}>
            <div style={{ flex: '1 1 85%' , zIndex :-10000000000 }}>
                <TopPanel/>
                <GameArea />    
            </div>
            <div style={{ flex: '1 1 18%' , zIndex :-10000000000 }}>
                <SidePanel/>
            </div>
    </div>
    )
}

