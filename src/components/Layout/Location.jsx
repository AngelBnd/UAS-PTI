import Minimap from './Minimap';

export default function Location() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-2"
        style={{
          
        }}>
      <div>You're here</div>
      <Minimap currentLocation="MainArea" />
    </div>
  );
}