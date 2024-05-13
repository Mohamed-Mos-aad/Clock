import style from '../Style/alarm.module.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { alarmContext } from './../Context/Store';
import AlarmRing from '../Components/AlarmRing';
import alarmsound from '../assets/alarmSound.mp3'




export default function Alarm() {
    let {mode,alarmsData,setAlarmsData} = useContext(alarmContext);

    function alarmReady()
    {
        const currentTotalMinutes = (new Date().getHours() * 60) + (new Date().getMinutes());
        for(let i = 0 ; i< alarmsData.length ; i++)
        {
            if(alarmsData[i].active === true)
            {
                const alarmTotalMinutes = (alarmsData[i].time_hour % 12 + (alarmsData[i].time_shift === 'AM' ? 0 : 12)) * 60 + alarmsData[i].time_minute;
                if(currentTotalMinutes === alarmTotalMinutes)
                {
                    if(alarmsData[i].repeat === 'Ring once')
                    {
                        document.getElementById(`alarm_${alarmsData[i].id}`).classList.remove(`${style.active}`);
                        document.getElementById('alarm_ring').style.display = 'flex';
                        let audio = document.getElementById('timerSound');
                        audio.play();
                        alarmsData[i].active = false;
                    }
                    else
                    {
                        for(let j = 0 ; j< alarmsData[i].repeat.length ; j++)
                        {
                            if(alarmsData[i].repeat[j] === (new Date().getDay().toString()))
                            {
                                document.getElementById('alarm_ring').style.display = 'flex';
                                let audio = document.getElementById('timerSound');
                                audio.play();
                                alarmsData[i].active = false;
                            }
                        }
                    }
                }
                else if(currentTotalMinutes < alarmTotalMinutes)
                {
                    if(alarmsData[i].repeat !== 'Ring once')
                    {
                        alarmsData[i].active = true;
                    }
                }
            }
        }
    }



    // Check Active Alarms
    useEffect(()=>{
        for(let i = 0 ; i< alarmsData.length ; i++)
        {
            if(alarmsData[i].active === true)
            {
                document.getElementById(`alarm_${alarmsData[i].id}`).classList.add(`${style.active}`);
            }
        }
    },[alarmsData])

    function activeAlarm(e)
    {
        document.getElementById(`alarm_${e.target.id}`).classList.toggle(`${style.active}`);
        let alarmData = alarmsData[e.target.id];
        if(alarmData.active === true)
        {
            alarmData.active = false;
            alarmData.ringing = false;
        }
        else
        {
            alarmData.active = true;
        }
    }


    function editeAlarm()
    {
        document.getElementById('addBtn').classList.toggle(`${style.buttonDisabled}`);
        document.getElementById('deleteBtn').classList.toggle(`${style.buttonDisabled}`);
        changeBtn();
    }


    function changeBtn()
    {
        let Btns = document.getElementsByClassName(`${style.alarm_button}`);
        for(let i = 0; i < Btns.length; i++)
        {
            Btns[i].classList.toggle(`${style.buttonDisabled}`);
        }
    }


    let [selectAlarmsList,setSelectAlarmsList] = useState([]);
    
    function selectAlarms(e)
    {
        e.target.classList.toggle(`${style.active}`);
        let oldList = [...selectAlarmsList];
        oldList.push(e.target.id);
        oldList = new Set(oldList);
        oldList = Array.from(oldList);
        setSelectAlarmsList(oldList);
    }


    function deleteAlarm()
    {
        let oldAlarmsData = [...alarmsData];
        for(let i = 0 ; i < selectAlarmsList.length; i++)
        {
            
            oldAlarmsData.splice(selectAlarmsList[i], 1);
        }
        setAlarmsData(oldAlarmsData);
        editeAlarm();
        setSelectAlarmsList([]);
    }


    setInterval(()=>(alarmReady()),1000);
    // Hide Alarm ring
    function hideRing()
    {
        document.getElementById('alarm_ring').style.display = 'none';
        let audio = document.getElementById('timerSound');
        audio.pause();
    }


    return (
        <>
            <div className={style.alarm} data-theme={mode}>
                <div className={style.alarm_ring} id='alarm_ring'>
                    <AlarmRing></AlarmRing>
                    <button onClick={()=>{hideRing()}}>cancel</button>
                    <audio src={alarmsound} id='timerSound'></audio>
                </div>
                <div className={style.alarms_container}>
                    {alarmsData.map((alarm,id)=>
                        <div className={style.alarm_item} id={`alarm_${id}`} key={id}>
                            <div className={style.alarm_details}>
                                <div className={style.alarm_time}>
                                    {alarm.time_hour < 10 ?
                                        `0${alarm.time_hour}`
                                    :
                                        `${alarm.time_hour}`
                                    }
                                    :
                                    {alarm.time_minute < 10 ?
                                        `0${alarm.time_minute}`
                                    :
                                        `${alarm.time_minute}`
                                    }
                                    <span>{alarm.time_shift}</span></div>
                                <div className={style.alarm_repate}>{alarm.repeat !== 'Ring once' ? 'Custom' : 'Ring once'}</div>
                            </div>
                            <div className={style.alarmName}>
                                {alarm.name}
                            </div>
                            <div className={`${style.alarm_active_button} ${style.alarm_button}`} onClick={(e)=>{activeAlarm(e)}} id={id}></div>
                            <div className={`${style.selectBtn} ${style.buttonDisabled} ${style.alarm_button}`} onClick={(e)=>{selectAlarms(e)}} id={id}></div>
                        </div>
                    )}
                </div>
                <div className={style.alarm_add_buttons}>
                    <Link to='/alarmDetails'>
                        <button id='addBtn' name='add alarm'>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </Link>
                    <button id='deleteBtn' onClick={()=>{deleteAlarm()}} className={style.buttonDisabled} name='delete alarm'>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button onClick={()=>{editeAlarm()}} name='edite alarm' >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
