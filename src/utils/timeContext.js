import { createContext, useContext, useState, useEffect } from 'react';

const TimeContext = createContext();


export function TimeProvider({ children }) {
  const [time, setTime] = useState(0);
  const [day, setDay] = useState(0);
  const [timeSpeed, setTimeSpeed] = useState(2000);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev + 10 >= 1440) {
          setDay(d => d + 1);
          return 0;
        }
        return prev + 10;
      });
    }, timeSpeed);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={{ time, setTime, day, setDay, timeSpeed, setTimeSpeed }}>
      {children}
    </TimeContext.Provider>
  );
}

export function useTime() {
  return useContext(TimeContext);
}



// export function useTimer(setTime, setDay){

//     useEffect(()=>{
//          const timer = setInterval(()=>{
//             setTime(prev=>{
//                 if(prev + 10>=1440){
//                     setDay(dayPrev => dayPrev + 1);
//                     return 0;
//                 }
//                 return prev + 10;
//             });
//         }, 1500);

//         return () => clearInterval(timer);
        
//     },[setTime, setDay]);



    
    // const countUpTimer = function (setTime, time, setDay, day) {
            // function updateGreeting() {
            //     let greetMsg = document.getElementById("greetingMsg");
            //     greetMsg.classList.remove("greet-apply");
        
            //     if (time === 0) {
            //         greetMsg.textContent = 'Good Morning, ' + inputName + '.';
            //     } else if (time === 720) {
            //         greetMsg.textContent = 'Good Afternoon, ' + inputName + '.';
            //     } else if (time === 1080) {
            //         greetMsg.textContent = 'Good Evening, ' + inputName + '.';
            //     }
        
            //     greetMsg.classList.remove("greet-apply");
            //     void greetMsg.offsetHeight; // Force reflow for animation
            //     greetMsg.classList.add("greet-apply");
            // }

            // updateGreeting();

            // const timer = setInterval(function () {
            //     setTime((prev)=>prev+10);
                // displayTime.textContent = `${hour}:${min}`;

                // Day Counter
                // if(time >= 1440) {
                //     time = 0;
                //     setDay((prev) => prev + 1);

                // }

                // if (time === 0 || time === 720 || time === 1080) {
                //     updateGreeting();
                // }
                
    //         }, 2000)
    //     }

    // countUpTimer(setTime, time, setDay, day);

