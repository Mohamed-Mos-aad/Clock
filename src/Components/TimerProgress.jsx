import { useContext, useEffect, useState } from 'react';
import { alarmContext } from '../Context/Store';
import style from '../Style/timerProgress.module.css'
import alarmsound from '../assets/alarmSound.mp3'

export default function TimerProgress() {
    let {timerTime,setTimerTime} = useContext(alarmContext);


    // Cancel timer progress function
    function cancelTimer()
    {
        setTimerTime({time: {hours: 0, minutes: 0 ,seconds: 0  ,milliSeconds:0}, active: false});
        clearInterval(startInterval);
        audio.pause();
        setFinsh(false);
        document.getElementById('pauseBtn').style.display = 'inline-block';
        document.getElementById('resumeBtn').style.display = 'none';
    }


    // Pause timer progress function
    function pauseTimer()
    {
        clearInterval(startInterval);
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('resumeBtn').style.display = 'inline-block';
    }


    // Resume timer progress function
    function resumeTimer()
    {
        millisecondsIndex = containueMilli;
        degValue = containueDegValue;
        setStartInterval(setInterval(startTimer,10));
        document.getElementById('pauseBtn').style.display = 'inline-block';
        document.getElementById('resumeBtn').style.display = 'none';
    }


    let [hours,setHours] = useState(0);
    let [minutes,setMinutes] = useState(0);
    let [seconds,setSeconds] = useState(0);
    let [finsh,setFinsh] = useState(false);





    // Time Algoritm
    let [containueDegValue,setContainueDegValue] = useState(0);

    let degValue = 360;
    let audio = document.getElementById('timerSound');

    
    function startTimer()
    {
        degValue = degValue - (360 / ((timerTime.time.milliSeconds - 1000) * 0.1));
        setContainueDegValue(degValue);
        if(degValue >= 0)
        {
            document.getElementById('progress_bar').style.background = `conic-gradient(var(--first-color) ${degValue}deg,#757575 0deg`;
        }


        if(millisecondsIndex > 0)
        {
            calcTime();
        }
        else
        {
            clearInterval(startInterval);
            setFinsh(true);
            document.getElementById('progress_bar').style.background = `conic-gradient(var(--first-color) 360deg,black 0deg`;
            audio.play();
            document.getElementById('pauseBtn').style.display = 'none';
            document.getElementById('resumeBtn').style.display = 'none';
        }
    }

    
    let [containueMilli,setContainueMilli] = useState(0);
    let millisecondsIndex = timerTime.time.milliSeconds;

    function calcTime()
    {
        millisecondsIndex = millisecondsIndex - 10;
        setContainueMilli(millisecondsIndex);
        let hors = Math.floor(millisecondsIndex / 3600000);
        let mins = Math.floor(millisecondsIndex % 3600000 / 60000);
        let secs = Math.floor((millisecondsIndex % 60000) / 1000);
        setHours(hors);
        setMinutes(mins);
        setSeconds(secs);
    }


    let [startInterval,setStartInterval] = useState(0);
    useEffect(()=>{
        if(timerTime.active === true)
        {
            setStartInterval(setInterval(startTimer,10));
            setHours(timerTime.time.hours) ;
            setMinutes(timerTime.time.minutes);
            setSeconds(timerTime.time.seconds);
        }
    },[timerTime])

    return (
        <div className={style.timer_progress_container}>
            <div className={style.progress_bar} id='progress_bar'>
                <div className={style.progress_bar_container}>
                    {
                        finsh === false ?
                        <div>
                            <span>
                                {hours < 10 ? "0"+hours : hours}
                            </span>
                            :
                            <span>
                                {minutes < 10 ? "0"+minutes : minutes}
                            </span>
                            :
                            <span>
                                {seconds < 10 ? "0"+seconds : seconds}
                            </span>
                        </div>
                        :
                        <i className="fa-regular fa-bell"></i>
                    }
                </div>
            </div>
            <div className={style.progress_start_btn}>
                <button onClick={()=>{cancelTimer()}}>Cancel</button>
                <button onClick={()=>{pauseTimer()}} id='pauseBtn'>Pause</button>
                <button onClick={()=>{resumeTimer()}} id='resumeBtn'>Resume</button>
            </div>
            <audio src={alarmsound} id='timerSound'></audio>
        </div>
    )
}