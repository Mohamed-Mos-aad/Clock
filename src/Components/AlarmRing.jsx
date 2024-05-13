import style from '../Style/alarmRing.module.css'


export default function AlarmRing() {
    return (
        <div className={style.timer_progress_container}>
            <div className={style.progress_bar} id='progress_bar'>
                <div className={style.progress_bar_container}>
                    <i className="fa-regular fa-bell"></i>
                </div>
            </div>
        </div>
    )
}