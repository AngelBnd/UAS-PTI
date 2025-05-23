import './PopUpMessage.css';

export default function PopUpMessage({message}){

    return(
        <div id="greetingMsg" className="greet-apply">
            {message}
        </div>
    )
}