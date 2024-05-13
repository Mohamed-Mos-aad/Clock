import {Routes, Route} from 'react-router-dom';
import Nav from './Components/Nav';
import Alarm from './Pages/Alarm';
import Clock from './Pages/Clock';
import StopWatch from './Pages/StopWatch';
import Timer from './Pages/Timer';
import AlarmDetails from './Pages/AlarmDetails';
import './Style/app.module.css'
import AlarmContextProvider from './Context/Store';
import CustomAlarmRepeat from './Pages/CustomAlarmRepeat';
import ClockDetails from './Pages/ClockDetails';

function App() {
  return (
    <>
      <AlarmContextProvider>
        <Nav/>
        <Routes>
            <Route path='/' element={<Alarm/>}/>
            <Route path='/alarm' element={<Alarm/>}/>
            <Route path='/alarmDetails' element={<AlarmDetails/>}/>
            <Route path='/customAlarmRepeat' element={<CustomAlarmRepeat/>}/>
            <Route path='/clock' element={<Clock/>}/>
            <Route path='/clockDetails' element={<ClockDetails/>}/>
            <Route path='/stop_watch' element={<StopWatch/>}/>
            <Route path='/timer' element={<Timer/>}/>
            <Route path='*' element={<Alarm/>}/>
        </Routes>
      </AlarmContextProvider>
    </>
  )
}

export default App
