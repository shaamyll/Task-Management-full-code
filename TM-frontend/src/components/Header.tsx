import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BellDot } from 'lucide-react'
import socket from '../Socket/socket'

function Header() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState<string[]>([]);
const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      await new Promise((res) => setTimeout(res, 500))
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    },
    onSuccess: () => {
      toast.error("Logged out");
      navigate('/')
    }
  })

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) setEmail(storedEmail)
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) setUsername(storedUsername)
    const storedRole = localStorage.getItem('role')
    if (storedRole) setRole(storedRole)

       const storedUserId = localStorage.getItem('userId');
  if (storedUserId) socket.emit('registerUser', Number(storedUserId));
  
  }, [])


  //Notifications
useEffect(() => {
  socket.on('receiveStatusUpdate', (status: any) => {
    setNotificationCount((prev) => prev + 1);
    setNotifications((prev) => [`Task status updated to "${status}"`, ...prev]);
    toast.info(`A task was updated to "${status}"`, { duration: 3000 });
  });

  return () => {
    socket.off('receiveStatusUpdate');
  };

}, []);

  return (
    <header className="fixed z-50 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

      <div className="flex items-center gap-4 relative">
      <div className="relative px-4">
  <button onClick={() => setShowDropdown((prev) => !prev)}>
    <BellDot className="w-6 h-6 text-gray-800" />
    {notificationCount > 0 && (
      <span className="absolute top-0 right-1 w-4 h-4 text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center">
        {notificationCount}
      </span>
    )}
  </button>

  {showDropdown && (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
      <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
        {notifications.length === 0 ? (
          <li className="p-3 text-center text-gray-400">No notifications</li>
        ) : (
          notifications.map((msg, i) => (
            <li key={i} className="p-3 border-b last:border-none hover:bg-gray-50">
              {msg}
            </li>
          ))
        )}
      </ul>
    </div>
  )}
</div>
        {(role !== 'admin' && role !== "project_manager") && (
          <p className="text-sm text-gray-600 font-medium">
            {username} ({email})
          </p>
        )}
        <Button variant="destructive" onClick={() => logout()} disabled={isPending}>
          {isPending ? "Logging out.." : "Log Out"}
        </Button>
      </div>
    </header>
  )
}

export default Header
