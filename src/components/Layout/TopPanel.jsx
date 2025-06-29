import './TopPanel.css'
import SidePanel from './SidePanel'
import Bars from './Bars';
import Avatar from './Avatar';
import ResourcesTime from './ResourcesTime';
import Radar from './Radar';

export default function TopPanel({setIsDead, resources}){
    return(
        <div className="top-panel d-flex justify-content-center align-items-center p-2 gap-4 ">   
            <Avatar/>
            <Bars 
            setIsDead={setIsDead}
            />
            <ResourcesTime
            resources = {resources}
            />
            <Radar/>
        </div>
    );
}