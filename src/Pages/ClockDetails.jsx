import { useContext, useEffect, useState } from 'react';
import style from '../Style/clockDetails.module.css'
import { alarmContext } from '../Context/Store';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ClockDetails() {
    let {mode,clocksData,setClocksData} = useContext(alarmContext);

    let [data,setData] = useState([]);
    let [clocksList,setClocksList] = useState([]);


    async function fetchData()
    {
        let {data} = await axios.get('http://api.timezonedb.com/v2.1/list-time-zone?key=BRC0HPIDSUTU&format=json');
        setData(data.zones);
    }


    useEffect(()=>{
        fetchData();
    },[])


    useEffect(()=>{
        if(data)
        {
            setClocksList(data);
        }
    },[data])


    // Search Function
    function clockSearch(e)
    {
        let test = [...data];
        test = test.filter((map) => map.countryName.toLowerCase().includes(e.target.value.toLowerCase()))
        setClocksList(test);
    }


    // Push Clock Data
    function selectClock(e)
    {
        let clocksContainer = [...clocksData];
        let clock = JSON.parse(e.currentTarget.getAttribute('data-clock'));
        clocksContainer = clocksContainer.filter(item => item.countryName !== clock.countryName);
        clocksContainer.unshift(clock);
        setClocksData(clocksContainer);
    }


    return (
        <div className={style.clockDetails}  data-theme={mode}>
            <div className={style.clocksSearch}>
                <input type="text" placeholder='Search With Country Name' onChange={(e)=>{clockSearch(e)}}/>
            </div>
            <div className={style.clocksContainer}>
                {clocksList.map((zone,index)=>
                    <Link to='/clock' key={index} data-clock={JSON.stringify(zone)} onClick={(e)=>{selectClock(e)}}>
                        <div className={style.clock}>
                            <div>{zone.countryCode}</div>
                            <div>{zone.countryName}</div>
                            <div>{zone.zoneName}</div>
                        </div>
                    </Link>

                )}
            </div>
        </div>
    )
}