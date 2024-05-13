import { useContext, useEffect, useRef, useState } from 'react';
import { alarmContext } from '../Context/Store';
import style from '../Style/alarmDetails.module.css'
import { Link } from 'react-router-dom';
import CustomAlarmRepeat from './CustomAlarmRepeat';

export default function AlarmDetails() {
    // Get Context Values
    let {mode,alarmsData,setAlarmsData,repeatDays} = useContext(alarmContext);



    // Variables 
    let [alarmHour,setAlarmHour] = useState(2);
    let [alarmMinute,setAlarmMinute] = useState(1);
    let [alarmShift,setAlarmShift] = useState('PM');
    let [alarmRepeat,setAlarmRepeat] = useState('Ring once');
    let alarmName = useRef('alarmName');


    // Basic Alarm
    let alarm = {
        id : null,
        name: 'test',
        time_hour: '2',
        time_minute: '1',
        time_shift: 'PM',
        repeat: 'Ring once',
        active: false
    };
    


    // Set Alarm Data 
    let oldData = [];
    function alarmData()
    {
        alarm = {
            id : (alarmsData.length),
            name: alarmName.current.value,
            time_hour: alarmHour,
            time_minute: alarmMinute,
            time_shift: alarmShift,
            repeat: alarmRepeat,
            active: false
        };
        oldData.push(...alarmsData,alarm);
    }

    // Save Alarm to Alarms data
    function saveAlarm()
    {
        alarmData();
        setAlarmsData(oldData);
    }



    // Change Time Up Function
    function timeUp(id)
    {
        if(id === '1')
        {
            hourUp();
        }
        if(id === '2')
        {
            minuteUp();
        }
        if(id === '3')
        {
            shiftUp();
        }
    }



    // Change Time Down Function
    function timeDown(id)
    {
        if(id === '1')
        {
            hourDown();
        }
        if(id === '2')
        {
            minuteDown();
        }
        if(id === '3')
        {
            shiftDown();
        }
    }


    useEffect(()=>{
        timeRange();
    },[alarmHour,alarmMinute,alarmRepeat,alarmShift]);



    // Change Hour Functions
    function hourUp()
    {
        if(alarmHour < 12)
        {
            document.getElementById(`List_1`).style.top = `${(alarmHour-1) * -(104)}px`;
            document.getElementById(`hour_${alarmHour}`).style.color = '#757575';
            document.getElementById(`hour_${alarmHour+1}`).style.color = '#E13859';
            setAlarmHour(alarmHour+ 1);
        }
    }



    function hourDown()
    {
        if(alarmHour > 1)
        {
            document.getElementById(`List_1`).style.top = `${(alarmHour-3) * -(104)}px`;
            document.getElementById(`hour_${alarmHour-1}`).style.color = '#E13859';
            document.getElementById(`hour_${alarmHour}`).style.color = '#757575';
            setAlarmHour(alarmHour-1);
        }
    }



    // Change Minute Functions
    function minuteUp()
    {
        if(alarmMinute < 59)
        {
            document.getElementById(`List_2`).style.top = `${(alarmMinute) * -(104)}px`;
            document.getElementById(`minute_${alarmMinute}`).style.color = '#757575';
            document.getElementById(`minute_${alarmMinute+1}`).style.color = '#E13859';
            setAlarmMinute(alarmMinute+1);
        }
    }

    function minuteDown()
    {
        if(alarmMinute > 0)
        {
            document.getElementById(`List_2`).style.top = `${(alarmMinute-2) * -(104)}px`;
            document.getElementById(`minute_${alarmMinute}`).style.color = '#757575';
            document.getElementById(`minute_${alarmMinute-1}`).style.color = '#E13859';
            setAlarmMinute(alarmMinute-1);
        }
    }



    // Change Shift Functions
    let [shiftindex,setShiftIndex] = useState(2);
    function shiftUp()
    {
        let shift = shiftindex+ 1;
        if(shift< 3)
        {
            setShiftIndex(shiftindex+ 1);
            document.getElementById(`List_3`).style.top = `0px`;
            document.getElementById(`shift_${shift-1}`).style.color = '#757575';
            document.getElementById(`shift_${shift}`).style.color = '#E13859';
            setAlarmShift('PM');
        }
    }

    function shiftDown()
    {
        let shift = shiftindex- 1;
        if(shift> 0)
        {
            setShiftIndex(shift);
            document.getElementById(`List_3`).style.top = `104px`;
            document.getElementById(`shift_${shift+1}`).style.color = '#757575';
            document.getElementById(`shift_${shift}`).style.color = '#E13859';
            setAlarmShift('AM');
        }
    }



    // Start Scroll Function
    let startScroll = 0;
    const handleScroll = (e) => {
        const deltaY = e.deltaY || e.touches[0].clientY - startScroll;

        if (deltaY > 10) {
            // Scrolling down
            timeDown(e.target.id);
        } else if (deltaY < -10) {
            // Scrolling up
            timeUp(e.target.id);
        }

        startScroll = e.touches ? e.touches[0].clientY : 0;
    };




    // Change Repeat Functions
    function changerepeat(e)
    {
        document.getElementById('btn_1').classList.toggle(`${style.active}`);
        document.getElementById('btn_2').classList.toggle(`${style.active}`);
        if(e.target.id === 'btn_1')
        {
            setAlarmRepeat('Range once');
        }
        else
        {
            document.getElementById('customPage').style.display = 'flex';
        }
    }


    // Close custom Page function
    function closeCustomPage()
    {
        document.getElementById('customPage').style.display = 'none';
        setAlarmRepeat(repeatDays);
    }


  // Get Time Range Function
    let [rangeHour, setRangeHour] = useState(0);
    let [rangeMinute, setRangeMinute] = useState(0);

    function timeRange() 
    {
        let currentHour = new Date().getHours();
        let currentMinute = new Date().getMinutes();
    
        if (alarmShift === "PM") 
        {
            if (alarmHour > (currentHour - 12)) 
            {
                if (alarmMinute >= currentMinute) 
                {
                    setRangeHour(alarmHour - (currentHour - 12));
                    setRangeMinute(alarmMinute - currentMinute);
                } 
                else 
                {
                    setRangeHour(alarmHour - (currentHour - 12) - 1);
                    setRangeMinute((60 - currentMinute) + alarmMinute);
                }
            } 
            else 
            {
                if (alarmMinute >= currentMinute) 
                {
                    setRangeHour((24 - currentHour) + alarmHour + 12);
                    setRangeMinute(alarmMinute - currentMinute);
                } 
                else 
                {
                    setRangeHour((24 - currentHour) + alarmHour + 11);
                    setRangeMinute((60 - currentMinute) + alarmMinute);
                }
            }
        } 
        else 
        {
            if (alarmHour > (currentHour - 12)) 
            {
                if (alarmMinute >= currentMinute) 
                {
                    setRangeHour((24 - currentHour) + alarmHour);
                    setRangeMinute(alarmMinute - currentMinute);
                } 
                else 
                {
                    setRangeHour((23 - currentHour) + alarmHour);
                    setRangeMinute((60 - currentMinute) + alarmMinute);
                }
            } 
            else 
            {
                if (alarmMinute >= currentMinute) 
                {
                    setRangeHour((24 - currentHour) + alarmHour);
                    setRangeMinute(alarmMinute - currentMinute);
                } 
                else 
                {
                    setRangeHour((23 - currentHour) + alarmHour);
                    setRangeMinute((60 - currentMinute) + alarmMinute);
                }
            }
        }
    }



    return (
        <div className={style.alarm_details} data-theme={mode}>
            <div className={style.ring_time}>
                Alarm will ring in 
                    {rangeHour > 0 ?
                        <span>
                            {rangeHour} h
                        </span>  
                    :
                        null
                    }
                <span> {rangeMinute}</span> min.
            </div>
            <div className={style.alarm_time}>
                <div className={style.time} onWheel={(e)=>{handleScroll(e)}} onTouchMove={(e)=>{handleScroll(e)}}>
                    <div className={style.hoursBtns} id='1'>
                        <button id='1' onClick={()=>{timeDown('1')}}></button>
                        <button id='1' onClick={()=>{timeUp('1')}}></button>
                    </div>
                    <ul id='List_1'>
                        <li id='hour_1'>01</li>
                        <li id='hour_2'>02</li>
                        <li id='hour_3'>03</li>
                        <li id='hour_4'>04</li>
                        <li id='hour_5'>05</li>
                        <li id='hour_6'>06</li>
                        <li id='hour_7'>07</li>
                        <li id='hour_8'>08</li>
                        <li id='hour_9'>09</li>
                        <li id='hour_10'>10</li>
                        <li id='hour_11'>11</li>
                        <li id='hour_12'>12</li>
                    </ul>
                    <input type="number" disabled name='alarmHours' value={"02"}/>
                </div>
                <div className={style.time} id='2' onWheel={(e)=>{handleScroll(e)}} onTouchMove={(e)=>{handleScroll(e)}}>
                    <div className={style.hoursBtns} id='2'>
                        <button id='2' onClick={()=>{timeDown('2')}}></button>
                        <button id='2' onClick={()=>{timeUp('2')}}></button>
                    </div>
                    <ul id='List_2'>
                        <li id='minute_0'>00</li>
                        <li id='minute_1'>01</li>
                        <li id='minute_2'>02</li>
                        <li id='minute_3'>03</li>
                        <li id='minute_4'>04</li>
                        <li id='minute_5'>05</li>
                        <li id='minute_6'>06</li>
                        <li id='minute_7'>07</li>
                        <li id='minute_8'>08</li>
                        <li id='minute_9'>09</li>
                        <li id='minute_10'>10</li>
                        <li id='minute_11'>11</li>
                        <li id='minute_12'>12</li>
                        <li id='minute_13'>13</li>
                        <li id='minute_14'>14</li>
                        <li id='minute_15'>15</li>
                        <li id='minute_16'>16</li>
                        <li id='minute_17'>17</li>
                        <li id='minute_18'>18</li>
                        <li id='minute_19'>19</li>
                        <li id='minute_20'>20</li>
                        <li id='minute_21'>21</li>
                        <li id='minute_22'>22</li>
                        <li id='minute_23'>23</li>
                        <li id='minute_24'>24</li>
                        <li id='minute_25'>25</li>
                        <li id='minute_26'>26</li>
                        <li id='minute_27'>27</li>
                        <li id='minute_28'>28</li>
                        <li id='minute_29'>29</li>
                        <li id='minute_30'>30</li>
                        <li id='minute_31'>31</li>
                        <li id='minute_32'>32</li>
                        <li id='minute_33'>33</li>
                        <li id='minute_34'>34</li>
                        <li id='minute_35'>35</li>
                        <li id='minute_36'>36</li>
                        <li id='minute_37'>37</li>
                        <li id='minute_38'>38</li>
                        <li id='minute_39'>39</li>
                        <li id='minute_40'>40</li>
                        <li id='minute_41'>41</li>
                        <li id='minute_42'>42</li>
                        <li id='minute_43'>43</li>
                        <li id='minute_44'>44</li>
                        <li id='minute_45'>45</li>
                        <li id='minute_46'>46</li>
                        <li id='minute_47'>47</li>
                        <li id='minute_48'>48</li>
                        <li id='minute_49'>49</li>
                        <li id='minute_50'>50</li>
                        <li id='minute_51'>51</li>
                        <li id='minute_52'>52</li>
                        <li id='minute_53'>53</li>
                        <li id='minute_54'>54</li>
                        <li id='minute_55'>55</li>
                        <li id='minute_56'>56</li>
                        <li id='minute_57'>57</li>
                        <li id='minute_58'>58</li>
                        <li id='minute_59'>59</li>
                    </ul>
                    <input type="number" id='2' disabled name='alarmHours' value={"30"}/>
                </div>
                <div className={style.time} id='3' onWheel={(e)=>{handleScroll(e)}} onTouchMove={(e)=>{handleScroll(e)}}>
                    <div className={style.hoursBtns} id='3'>
                        <button id='3' onClick={()=>{timeDown('3')}}></button>
                        <button id='3' onClick={()=>{timeUp('3')}}></button>
                    </div>
                    <ul id='List_3'>
                        <li id='shift_1'>AM</li>
                        <li id='shift_2'>PM</li>
                    </ul>
                    <input type="text" disabled name='alarmHours' value={"PM"}/>
                </div>
            </div>
            <div className={style.repate} >
                <button id='btn_1' onClick={(e)=>{changerepeat(e)}} className={style.active}>Ring once</button>
                <button id='btn_2' onClick={(e)=>{changerepeat(e)}}>Custom</button>
            </div>
            <div className={style.customPage} id='customPage'>
                <CustomAlarmRepeat/>
                <button className={style.done} onClick={()=>{closeCustomPage()}}>
                    <i className="fa-solid fa-check"></i>
                </button>
            </div>
            <div className={style.alarm_name}>
                <h2>Alarm name</h2>
                <input type="text" ref={alarmName} name='alarmName' placeholder='Alarm'/>
            </div>
            <div className={style.alarm_details_Buttons}>
                <Link to='/alarm'>
                    <button>Cancel</button>
                </Link>
                <Link to='/alarm'>
                    <button onClick={()=>{saveAlarm()}}>Save</button>
                </Link>
            </div>
        </div>
    )
}
