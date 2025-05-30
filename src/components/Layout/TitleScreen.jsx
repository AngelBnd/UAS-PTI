import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleScreen.css';
import title from "../../assets/title.png";

const TitleScreen = () => {
  const navigate = useNavigate();
  const hasFaded = useRef(false); // Using useRef so it can detect if the title screen has been faded yet

  function fade(element) {
    if (hasFaded.current) return;
    hasFaded.current = true;

    var opacity = 1;
    var timer = setInterval(function () {
        if (opacity <= 0.1) {
          element.style.opacity = 0;
          clearInterval(timer);
          setTimeout(() => {
            element.style.display = 'none';
            navigate('./cutscene');
          }, 2000);
          return;
        }
        element.style.opacity = opacity;
        element.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity -= opacity * 0.1;
    }, 60);
}

  return (
    <div id="blackbg">
      <div id="title-screen" className='container-fluid d-flex flex-column align-items-center' onClick={(e) => fade(e.currentTarget)} style={{ opacity: 1 }}>

        <div className='title mx-auto container d-flex justify-content-center align-items-end'>
          <img id='title-img' src={title} alt="" />
        </div>

        <div className='sub-title container mx-auto d-flex justify-content-center align-items-start my-auto'>
          Click to begin your journey… the last journey.
        </div>

      </div>
    </div>
    
  );
};

export default TitleScreen;