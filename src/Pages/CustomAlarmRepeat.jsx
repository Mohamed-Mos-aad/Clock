import { useContext } from 'react';
import style from '../Style/customAlarmRepeat.module.css'
import { alarmContext } from '../Context/Store';

export default function CustomAlarmRepeat() {
    let {mode,repeatDays,setRepeatDays} = useContext(alarmContext);

    function activeAlarm(e)
    {
        e.target.classList.toggle(`${style.active}`);
        addDay(e);
    }

    
    function addDay(e)
    {
        let daysList = [...repeatDays];
        if(repeatDays.includes(e.target.id))
        {
            daysList = repeatDays.filter((day) => day !== e.target.id)
        }
        else
        {
            daysList.push(e.target.id);
        }
        setRepeatDays(daysList);
    }



    


    return (
        <div className={style.customRepeat} data-theme={mode}>
            <div className={style.day}>
                <label htmlFor="sunday">Every Sunday</label>
                <div className={style.checkBox} id='0' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
            
            <div className={style.day}>
                <label htmlFor="monday">Every Monday</label>
                <div className={style.checkBox} id='1' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
            
            <div className={style.day}>
                <label htmlFor="tuesday">Every Tuesday</label>
                <div className={style.checkBox} id='2' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
            
            <div className={style.day}>
                <label htmlFor="wednesday">Every Wednesday</label>
                <div className={style.checkBox} id='3' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
            
            <div className={style.day}>
                <label htmlFor="thursday">Every Thursday</label>
                <div className={style.checkBox} id='4' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
            
            <div className={style.day}>
                <label htmlFor="friday">Every Friday</label>
                <div className={style.checkBox} id='5' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
            
        
            <div className={style.day}>
                <label htmlFor="saturday">Every Saturday</label>
                <div className={style.checkBox} id='6' onClick={(e)=>{activeAlarm(e)}}></div>
            </div>
        </div>
    )
}
