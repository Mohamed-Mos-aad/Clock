import { useContext, useState } from "react";
import { alarmContext } from "../Context/Store";
import style from '../Style/stopWatch.module.css'

export default function StopWatch() {
    // Get Context Values
    let {mode} = useContext(alarmContext);


    // Time Values
    let [time,setTime] = useState(
        {
            minutes : 0,
            seconds : 0,
            milliSeconds : 0
        }
    )

    // Basics Of Time
    let [milliIndex,setMilliIndex] = useState(0);



    // StopWatch Algorithm Function
    let millisecondsIndex = 0;
    function stopWatchAlgorithm()
    {
        millisecondsIndex = millisecondsIndex + 10;
        let mins = Math.floor(millisecondsIndex / 60000);
        let secs = Math.floor((millisecondsIndex % 60000) / 1000);
        let millisecs = Math.floor((millisecondsIndex % 1000) / 10);
        setTime(
            {
                minutes : mins,
                seconds : secs,
                milliSeconds : millisecs
            }
        );
        setMilliIndex(millisecondsIndex);
        document.getElementById('stopWatchClock').style.transform = `rotate(${millisecondsIndex * 0.006}deg)`
    }
    


    // Start StopWatch Function
    let [startInterval,setStartInterval] = useState(0);
    function start()
    {
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('activeBtns').style.display = 'flex';
        setStartInterval(setInterval(stopWatchAlgorithm,10));
    }


    // Add lap Function
    let [lapsList,setLapsList] = useState([]);
    let [previousMilli,setPreviousMilli] = useState(0);
    function addLap()
    {
        let newLapsList = [...lapsList];
        let rangeTime = milliIndex - previousMilli;
        let mins = Math.floor(rangeTime / 60000);
        let secs = Math.floor((rangeTime % 60000) / 1000);
        let millisecs = Math.floor((rangeTime % 1000) / 10);
        let lap = 
        {
            index: lapsList.length < 9 ? `0${(lapsList.length) +1}` : (lapsList.length) +1,
            taken: `${time.minutes < 10 ? `0${time.minutes}`: time.minutes}:${time.seconds < 10 ? `0${time.seconds}`: time.seconds}:${time.milliSeconds < 10 ? `0${time.milliSeconds}`: time.milliSeconds}`,
            range: `${mins < 10 ? `0${mins}`: mins}:${secs < 10 ? `0${secs}`: secs}:${millisecs < 10 ? `0${millisecs}`: millisecs}`,
        }
        newLapsList.push(lap);
        setLapsList(newLapsList);
        setPreviousMilli(milliIndex);
    }



    // Pause StopWatch Function
    function pause()
    {
        document.getElementById('activeBtns').style.display = 'none';
        document.getElementById('stopBtns').style.display = 'flex';
        clearInterval(startInterval);
    }



    // Resume StopWatch Function
    function resume()
    {
        document.getElementById('activeBtns').style.display = 'flex';
        document.getElementById('stopBtns').style.display = 'none';
        millisecondsIndex = milliIndex;
        setStartInterval(setInterval(stopWatchAlgorithm,10));
    }



    // Cancel StopWatch Function
    function cancel()
    {
        document.getElementById('stopBtns').style.display = 'none';
        document.getElementById('startBtn').style.display = 'block';
        setTime(
            {
                minutes : 0,
                seconds: 0,
                milliSeconds:0
            }
        )
        setMilliIndex(0);
        document.getElementById('stopWatchClock').style.transform = `rotate(0deg)`
    }

    return (
        <div className={style.stop_watch} data-theme={mode}>
            <div className={style.stop_watch_clock}>
                <div id="stopWatchClock" className={style.circle}></div>
                {time.minutes < 10 ?
                    <span>0{time.minutes}</span>
                    :
                    <span>{time.minutes}</span>
                }
                :
                {time.seconds < 10 ?
                    <span>0{time.seconds}</span>
                    :
                    <span>{time.seconds}</span>
                }
                .
                {time.milliSeconds < 10 ?
                    <span>0{time.milliSeconds}</span>
                    :
                    <span>{time.milliSeconds}</span>
                }
            </div>
            <div className={style.stop_watch_laps}>
                {lapsList.map((lap,index)=>
                    <div className={style.lap} key={index}>
                        <span>{lap.index}</span>
                        <span>{lap.taken}</span>
                        <span>{lap.range}</span>
                    </div>
                )}
            </div>
            <div className={style.stop_watch_buttons}>
                <button id="startBtn" onClick={()=>{start()}}>Start</button>
                <div id="activeBtns" className={style.active_buttons}>
                    <button onClick={()=>{addLap()}}>Lap</button>
                    <button onClick={()=>{pause()}}>Pause</button>
                </div>
                <div id="stopBtns" className={style.stop_buttons}>
                    <button onClick={()=>{cancel()}}>Cancel</button>
                    <button onClick={()=>{resume()}}>Resume</button>
                </div>
            </div>
        </div>
    )
}
