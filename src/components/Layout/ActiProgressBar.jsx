import './ActiProgressBar.css';

export default function ActiProgressBar({ progressPercentage }){
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-filled"
        style={{ height: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}