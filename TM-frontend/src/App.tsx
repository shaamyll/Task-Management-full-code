import {  Routes , Route } from 'react-router-dom'
import './App.css'
import { Auth } from './Pages/Auth'
import Userdashboard from './Pages/User/Userdashboard'
import { Toaster } from 'sonner'
  import { SidebarProvider } from './components/ui/sidebar'
import ManageUsers from './Pages/Admin/ManageUsers'
import TaskPage from './Pages/Admin/TaskPage'


function App() {
  return (
    
    <>
    <Toaster richColors position="top-right"/>
     <SidebarProvider defaultOpen={true}>
       <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/register" element={<Auth register />} />
        <Route path='/userDashboard' element={<Userdashboard/>}/>
        {/* Admin Pages */}
        <Route path='/manageUsers' element={<ManageUsers/>}/>
        <Route  path='/taskPage' element={<TaskPage/>} />
      </Routes>
     </SidebarProvider>
    </>  

      
  )
}

export default App
