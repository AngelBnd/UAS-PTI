import LocationMap from '../../assets/playerareabg.png'

export default function Location(){
    return(
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <div>You're here</div>
            <img src={LocationMap} style={{width : '220px', border:'1px solid #ffdba2',}}/>
        </div>
    )
}