import style from '../Style/timer.module.css'
import { useContext, useEffect, useState } from 'react';
import { alarmContext } from '../Context/Store';
import TimerProgress from './../Components/TimerProgress';


export default function Timer() {
    let {mode,timerTime,setTimerTime} = useContext(alarmContext);


    let [savesData,setSavesData] = useState([]);



    // Get Timer Data
    function getTimerData()
    {
        let hourValue = document.getElementById('timer_hours').value;
        let minValue = document.getElementById('timer_minutes').value;
        let secValue = document.getElementById('timer_seconds').value;

        let store = {
                hours: hourValue,
                minutes: minValue,
                seconds: secValue,
                milliSeconds: (hourValue * 60 * 60 * 1000) + (minValue * 60 * 1000) + (secValue * 1000)
            };
        return store;
    }




    // Max Values fucntion
    let [hoursValue, setHoursValue] = useState(0);
    let [minutesValue, setMinutesValue] = useState(0);
    let [secondsValue, setSecondsValue] = useState(0);
    function maxValue(e)
    {
        let value = e.target.value;
        if (value.length === 2 && value.startsWith('0'))
        {
            value = value.slice(1);
        }

        if (value <= 60) 
        {
            if(e.target.id === 'timer_hours')
            {
                setHoursValue(value);
            }
            else if(e.target.id === 'timer_minutes')
            {
                setMinutesValue(value);
            }
            else if(e.target.id === 'timer_seconds')
            {
                setSecondsValue(value);
            }
        }
    }


    // Store Timer Time function
    function storeTimerTime()
    {
        let timerData = getTimerData();
        setTimerTime({time: {hours: timerData.hours,minutes: timerData.minutes,seconds: timerData.seconds,milliSeconds: timerData.milliSeconds}, active: true});
    }


    // Show and Hide Timer Progress
    useEffect(()=>{
        if(timerTime.active === true)
        {
            document.getElementById('timer_progress').style.display = 'flex';
        }
        else
        {
            document.getElementById('timer_progress').style.display = 'none';
        }
    },[timerTime])


    // Add Timer Function
    function addTimer()
    {
        let timerData = getTimerData();
        if(timerData.hours !== 0 || timerData.minutes !== 0 || timerData.seconds !== 0)
        {
            if(timerData.hours !== '' || timerData.minutes !== '' || timerData.seconds !== '')
            {
                if(timerData.hours !== '0' || timerData.minutes !== '0' || timerData.seconds !== '0')
                {
                    let arrayStore = [...savesData];
                    arrayStore = arrayStore.filter((item) => item.milliSeconds !== timerData.milliSeconds);
                    arrayStore.push(timerData);
                    setSavesData(arrayStore);
                }
            }
        }
    }


    // Set active Timer Function
    let [state,setState] = useState({active: false,id: null});
    
    function activeTimer(e)
    {
        if(state.active === false)
        {
            e.currentTarget.style.backgroundColor  = '#4E1118';
            let stateStore = {active: true, id: e.currentTarget.id};
            setState(stateStore);
        }
        else
        {
            e.currentTarget.style.backgroundColor  = 'transparent';
            let stateStore = {active: false, id: null};
            setState(stateStore);
        }
    }


    // Start Timer Function
    function startTimer()
    {
        if(state.active === false)
        {
            storeTimerTime();
        }
        else
        {
            let timerData = savesData[state.id];
            setTimerTime({time: {hours: timerData.hours,minutes: timerData.minutes,seconds: timerData.seconds,milliSeconds: timerData.milliSeconds}, active: true});
        }
    }




    return (
        <div className={style.timer} data-theme={mode}>
            <div className={style.time}>
                <div className={style.time_part}>
                    <input type="number" id='timer_hours' placeholder='0' onChange={(e)=>{maxValue(e)}} max={60} value={hoursValue}/>
                    <label htmlFor="timer_hours">Hr</label>
                </div>
                <div className={style.time_part}>
                    <input type="number" id='timer_minutes' placeholder='0' onChange={(e)=>{maxValue(e)}} max={60} value={minutesValue} />
                    <label htmlFor="timer_minutes">Min</label>
                </div>
                <div className={style.time_part}>
                    <input type="number" id='timer_seconds' placeholder='0' onChange={(e)=>{maxValue(e)}} max={60} value={secondsValue} />
                    <label htmlFor="timer_seconds">Sec</label>
                </div>
            </div>
            <div className={style.time_saves}>
                {savesData.map((item,index)=>(
                    <div className={style.save} key={index} id={index} onClick={(e)=>{activeTimer(e)}}>
                        <div className={style.time_Data}>
                            {item.hours < 10 ? <span>0{item.hours}</span>:<span>{item.hours}</span>}
                            :
                            {item.minutes < 10 ? <span>0{item.minutes}</span>:<span>{item.minutes}</span>}
                            :
                            {item.seconds < 10 ? <span>0{item.seconds}</span>:<span>{item.seconds}</span>}
                        </div>
                    </div>
                ))}
                <div className={style.save} onClick={()=>{addTimer()}}>
                    Add
                </div>
            </div>
            <div className={style.start_Btn}>
                <button onClick={()=>{startTimer()}}>Start</button>
            </div>
            <div className={style.timer_progress} id='timer_progress'>
                <TimerProgress></TimerProgress>
            </div>
        </div>
    )
}
