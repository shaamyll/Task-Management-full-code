import {  Routes , Route } from 'react-router-dom'
import './App.css'
import { Auth } from './Pages/Auth'
import Userdashboard from './Pages/User/Userdashboard'
import { Toaster } from 'sonner'
import AdminUsersPage from './Pages/Admin/AdminUsersPage'
import { SidebarProvider } from './components/ui/sidebar'


function App() {
  return (
    
    <>
    <Toaster richColors position="top-right"/>
     <SidebarProvider defaultOpen={true}>
       <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/register" element={<Auth register={true} />} />
        <Route path='/userDashboard' element={<Userdashboard/>}/>
        <Route path='/allUsersAdmin' element={<AdminUsersPage/>}/>
      </Routes>
     </SidebarProvider>
    </>  

      
  )
}

export default App
