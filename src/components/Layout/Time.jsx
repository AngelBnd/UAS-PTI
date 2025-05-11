export default function Time(){
    return(
        <div className="d-flex flex-column gap-1" id="time-day">
            <div>
                <div>TIME:</div>
                <span id="counter">00:00</span>
            </div>
            <div>
                <div>DAY: 
                    <span id="days">1</span>
                </div>
            </div>  
        </div>
    )
}