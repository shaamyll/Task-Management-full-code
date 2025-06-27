import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Auth } from './Pages/Auth'
import Userdashboard from './Pages/User/Userdashboard'
import { Toaster } from 'sonner'
import { SidebarProvider } from './components/ui/sidebar'
import ManageUsers from './Pages/Admin/ManageUsers'
import TaskPage from './Pages/Admin/TaskPage'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import PM_TaskPage from './Pages/project-Manager/PM_TaskPage'
import AssigningPage from './Pages/project-Manager/AssigningPage'
import DeveloperDashboard from './Pages/Developer/DeveloperDashboard'


function App() {
  return (

    <>
      <Toaster richColors position="top-right" />
      <SidebarProvider defaultOpen={true}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Auth register />} />
          <Route path='/userDashboard' element={<Userdashboard />} />
          {/* Admin Pages */}
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/usersPage' element={<ManageUsers />} />
          <Route path='/admin/taskPage' element={<TaskPage />} />
          {/* Project-manager */}
          <Route path='/pm/taskPage' element={<PM_TaskPage/>} />
          <Route path='/pm/Assignments' element={<AssigningPage/>} />
          {/* Developer */}
          <Route path='/dev/dashboard' element={<DeveloperDashboard/>}/>
        </Routes>
      </SidebarProvider>
    </>


  )
}

export default App
