import './Bars.css';

const stats = [
  { id: 'healthBar', label: 'Health', idx:1 },
  { id: 'oxygenBar', label: 'Oxygen', idx:1 },
  { id: 'hungerBar', label: 'Hunger', idx:2 },
  { id: 'energyBar', label: 'Energy', idx:2 },
]

const rows = [
    {idx: 1},
    {idx: 2},
]

export default function Bars(){
    return(
        <div id="bars">     
            {rows.map((row)=>(
                <div className="row rowBars justify-content-center">
                    {stats
                    .filter(stat => stat.idx === row.idx)
                    .map((stat) => (
                    <div
                        key={stat.id}
                        className="col-6 d-flex flex-column align-items-start mb-2"
                    >
                        <label htmlFor={stat.id}>{stat.label}</label>
                        <progress id={stat.id} max="100"></progress>
                    </div>
                ))}
            </div>
            ))}
        </div>
    );
}