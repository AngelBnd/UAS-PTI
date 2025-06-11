import Minimap from './Minimap';

export default function Location(){
    return (
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <div>You're here</div>
            <Minimap />
        </div>
    );
}
