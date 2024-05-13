import { createContext ,useEffect,useState } from "react";

export let alarmContext = createContext(0);

export default function AlarmContextProvider(props)
{
    let [mode,setMode] = useState('dark');
    let [alarmsData,setAlarmsData] = useState([]);
    let [repeatDays,setRepeatDays] = useState([]);
    let [clocksData,setClocksData] = useState([]);
    let [timerTime,setTimerTime] = useState({time: 0, active: false});

    const contextValues = {
        mode,
        setMode,
        alarmsData,
        setAlarmsData,
        repeatDays,
        setRepeatDays,
        clocksData,
        setClocksData,
        timerTime,
        setTimerTime
    };


    useEffect(()=>{
        let alarmsDataServer = localStorage.getItem("alarmsDataServer");
        let clocksDataServer = localStorage.getItem("clocksDataServer");
        if(alarmsDataServer)
        {
            setAlarmsData(JSON.parse(alarmsDataServer));
        }


        if(clocksDataServer)
        {
            setClocksData(JSON.parse(clocksDataServer));
        }
    },[])


    useEffect(()=>{
        localStorage.setItem("alarmsDataServer", JSON.stringify(alarmsData));
        localStorage.setItem("clocksDataServer", JSON.stringify(clocksData));
    },[alarmsData,clocksData])

    
    return <alarmContext.Provider value={contextValues}>
        {props.children}
    </alarmContext.Provider>
}