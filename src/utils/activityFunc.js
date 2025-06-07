

export default function activityFunc(timeSpeed, didMountRef,timeoutRef,intervalRef,ActivityFunc,setActivityFunc,setDoingActivity,setTime,setDay,skipActivityRef,setStats,setActiProgress,actiDuration,setMovementLock){
    let timeLeft = actiDuration;
    let repsLeft;
    let progressTimes = actiDuration/timeSpeed;
   
    console.log(progressTimes);

    if(!didMountRef.current){
        didMountRef.current = true;
        return;
    }

    if (typeof ActivityFunc !== "function") return;

    intervalRef.current = setInterval(()=>{
        if(!skipActivityRef.current){
            setTimeout(() => {
                setActiProgress((prev)=>prev+(100/progressTimes));        
            }, 100);
           
            ActivityFunc();
            timeLeft -= timeSpeed;
        } else {
            repsLeft = Math.floor(timeLeft / timeSpeed);
            console.log(repsLeft);
            for(let i = 0  ; i < repsLeft ; i++){
                setActiProgress((prev)=>prev+(100/progressTimes));
                setTimeout(() => {
                    ActivityFunc();
                    setStats((prev)=>({
                        ...prev,
                        hungerBar: Math.max(prev.hungerBar - 1, 0),
                        oxygenBar: Math.max(prev.oxygenBar - 1, 0),
                        energyBar: Math.max(prev.energyBar - 1, 0),
                    }));
                }, 20);
            }
            setTime(prev => {
                let next = Math.floor((prev + timeLeft)/120);
                let modRem = next % 10;
                next -= modRem;

                if (next >= 1440) {
                    setDay(d => d + 1); 
                    return;
                }
                return Math.floor(prev + next);
            });
            skipActivityRef.current = false;
            clearInterval(intervalRef.current);

            setTimeout(() => {
                setDoingActivity(false);
                setActivityFunc(null);
                setActiProgress(0);
                setMovementLock(false);
            }, 500);
            
        }
    },timeSpeed);

    timeoutRef.current= setTimeout(()=>{
        clearInterval(intervalRef.current);
        setActivityFunc(null);
        setDoingActivity(false);
        setActiProgress(0);
    },actiDuration);

    return()=>{
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);

    };

}