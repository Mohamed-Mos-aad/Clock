import { Link } from "react-router-dom";
import style from './../Style/nav.module.css'
import { useContext, useEffect, useState } from "react";
import { alarmContext } from "../Context/Store";

export default function Nav() {
    let {mode,setMode} = useContext(alarmContext);

    function changeMode()
    {
        if(mode === 'dark')
        {
            setMode('light');
        }
        else
        {
            setMode('dark');
        }
    }


    // Active Link Function
    function activeLink(e)
    {
        let links = document.querySelectorAll("a");
        for(let i = 0;i< links.length;i++)
        {
            links[i].classList.remove(`${style.active}`);
        }
        setActivePage(window.location.hash);
        document.getElementById(e.target.id).classList.add(`${style.active}`);
    }

    let [activePage,setActivePage] = useState('/');

    
    useEffect(()=>{
        if(window.location.hash === '' || window.location.hash === '#/' || window.location.hash === '#/alarmDetails' || window.location.hash === '#/alarm')
        {
            document.getElementById("#/alarm").classList.add(`${style.active}`);
        }
        else if(window.location.hash === '#/customAlarmRepeat')
        {
            document.getElementById("#/alarm").classList.add(`${style.active}`);
        }
        else if(window.location.hash === '#/clockDetails')
        {
            document.getElementById("#/clock").classList.add(`${style.active}`);
        }
        else if(window.location.hash === '#/clock')
        {
            document.getElementById("#/clock").classList.add(`${style.active}`);
        }
        else if(window.location.hash === '#/stop_watch')
        {
            document.getElementById("#/stop_watch").classList.add(`${style.active}`);
        }
        else if(window.location.hash === '#/timer')
        {
            document.getElementById("#/timer").classList.add(`${style.active}`);
        }
    },[activePage]);
    

    return (
        <>
            <div className={style.nav} data-theme={mode}>
                <ul>
                    <li>
                        <Link to='alarm' id="#/alarm" onClick={(e)=>{activeLink(e)}}>
                            Alarm
                        </Link>
                    </li>
                    <li>
                        <Link to='clock' id="#/clock" onClick={(e)=>{activeLink(e)}}>
                            Clock
                        </Link>
                    </li>
                    <li>
                        <Link to='stop_watch' id="#/stop_watch" onClick={(e)=>{activeLink(e)}}>
                            Stop Watch
                        </Link>
                    </li>
                    <li>
                        <Link to='timer' id="#/timer" onClick={(e)=>{activeLink(e)}}>
                            Timer
                        </Link>
                    </li>
                </ul>
                <div className={style.alarm_mode_buttons}>
                    <button onClick={()=>{changeMode()}}>
                        {
                            mode === 'dark' ?
                            <i className="fa-regular fa-moon"></i>
                            :
                            <i className="fa-regular fa-sun"></i>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}
