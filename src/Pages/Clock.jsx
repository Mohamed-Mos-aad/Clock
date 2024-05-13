import { useContext, useState } from 'react';
import { alarmContext } from '../Context/Store';
import style from '../Style/clock.module.css'
import { Link } from 'react-router-dom';

export default function Clock() {
    let {mode,clocksData,setClocksData} = useContext(alarmContext);

    function convertTime(timestamp,gmtOffset)
    {
        // Convert Unix time to milliseconds
        var unixMilliseconds = timestamp * 1000;

        // Create a Date object with the Unix milliseconds
        var date = new Date(unixMilliseconds);

        // Get the UTC time by adding the timezone offset
        var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

        // Adjust for the desired timezone offset
        var desiredTime = utcTime + (gmtOffset * 3600000);

        // Create a new Date object with the adjusted time
        var adjustedDate = new Date(desiredTime);

        // Get the hour and minute
        var hour = adjustedDate.getHours();
        var minute = adjustedDate.getMinutes();

        // Format hour and minute
        var formattedHour = (hour < 10 ? '0' : '') + hour;
        var formattedMinute = (minute < 10 ? '0' : '') + minute;

        // Return the formatted time
        return (formattedHour > 12 ? formattedHour - 12 : formattedHour)  + ':' + formattedMinute + ' ' + (formattedHour > 12 ? 'MP' : 'AM') ;
    }



    // Show Select Btn
    function editeClock()
    {
        document.getElementById('addBtn').classList.toggle(`${style.buttonDisabled}`);
        document.getElementById('deleteBtn').classList.toggle(`${style.buttonDisabled}`);
        changeBtn();
    }

    function changeBtn()
    {
        let Btns = document.getElementsByClassName(`${style.selectBtn}`);
        for(let i = 0; i < Btns.length; i++)
        {
            Btns[i].classList.toggle(`${style.buttonDisabled}`);
        }
    }

    let [selectClocksList,setSelectClocksList] = useState([]);

    function selectAlarms(e)
    {
        e.target.classList.toggle(`${style.active}`);
        const clockId = e.target.id;
        if (selectClocksList.includes(clockId)) {
            // If it's already in the list, remove it
            setSelectClocksList(prevList => prevList.filter(item => item !== clockId));
        } else {
            // If it's not in the list, add it
            setSelectClocksList(prevList => [...prevList, clockId]);
        }
    }


    function deleteClock()
    {
        for(let i = 0; i < selectClocksList.length; i++)
        {
            clocksData = clocksData.filter(item => item.countryCode !== selectClocksList[i]);
        }
        setClocksData(clocksData);
        editeClock();
        setSelectClocksList([]);
        let Btns = document.getElementsByClassName(`${style.selectBtn}`);
        for(let i = 0 ; i < Btns.length;i++)
        {
            Btns[i].classList.remove(`${style.active}`);
        }
    }

    return (
        <div className={style.clock} data-theme={mode}>
            <div className={style.clocksContainer}>
                {clocksData.map((clock,index)=>
                    <div className={style.clockItem} key={index}>
                        <div className={style.clockName}>{clock.countryName}</div>
                        <div className={style.countryClock}>
                            {convertTime(clock.timestamp,clock.gmtOffset)}
                            <div className={`${style.selectBtn} ${style.buttonDisabled}`} onClick={(e)=>{selectAlarms(e)}} id={clock.countryCode}></div>
                        </div>
                    </div>
                )}
            </div>
            <div className={style.clock_add_buttons}>
                    <Link to='/clockDetails'>
                        <button id='addBtn'>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </Link>
                    <button id='deleteBtn' className={style.buttonDisabled} onClick={()=>{deleteClock()}}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button onClick={()=>{editeClock()}}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
            </div>
        </div>
    )
}
