import {  Routes , Route } from 'react-router-dom'
import './App.css'
import { Auth } from './Pages/Auth'
import Userdashboard from './Pages/Userdashboard'


function App() {
  return (
    
   
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path='/userDashboard' element={<Userdashboard/>}/>
      </Routes>
      

      
  )
}

export default App
