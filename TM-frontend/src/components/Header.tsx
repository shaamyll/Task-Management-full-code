import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BellDot } from 'lucide-react'
import socket from '../Socket/socket'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { playNotificationSound } from '@/Socket/NotificationSound'

function Header() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [notificationCount, setNotificationCount] = useState(0)
  const [notifications, setNotifications] = useState<string[]>([])

  const navigate = useNavigate()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      await new Promise((res) => setTimeout(res, 500))
      localStorage.removeItem('token')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('username')
      localStorage.removeItem('role')
    },
    onSuccess: () => {
      toast.error("Logged out")
      navigate('/')
    },
  })

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    const storedUsername = localStorage.getItem('username')
    const storedRole = localStorage.getItem('role')

    if (storedEmail) setEmail(storedEmail)
    if (storedUsername) setUsername(storedUsername)
    if (storedRole) setRole(storedRole)
  }, [])

  // Notifications
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) socket.emit('registerUser', Number(userId))

    socket.on('receiveStatusUpdate', ({ message }) => {
      setNotificationCount((prev) => prev + 1)
      setNotifications((prev) => [message, ...prev])
      playNotificationSound()
    })

    socket.on('receiveCommentNotification', ({ message }) => {
      setNotificationCount((prev) => prev + 1);
      setNotifications((prev) => [message, ...prev]);
      playNotificationSound()
    });



    return () => {
      socket.off('receiveStatusUpdate')
      socket.off('receiveCommentNotification');

    }
  }, [])

  return (
    <header className="fixed z-50 w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
      <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <DropdownMenu  onOpenChange={(open)=>{
          if(open) {
            setNotificationCount(0)
          }
        }}>
          <DropdownMenuTrigger asChild>
            <button className="relative focus:outline-none">
              <BellDot className="w-6 h-6 text-gray-800" />
              {notificationCount <= 0 ? (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center">
                  0
                </span> 
              ) : (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-600 text-white rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='w-80' align="end" sideOffset={4}>
            <DropdownMenuLabel className="text-base font-semibold text-gray-500 mb-1">
              Notifications
            </DropdownMenuLabel>

            {notifications.length === 0 ? (
              <DropdownMenuItem disabled >
                No notifications
              </DropdownMenuItem>
            ) : (
              notifications.map((msg, i) => (
                <DropdownMenuItem
                  key={i}
                 
                >
                  {msg.length > 100 ? `${msg.slice(0, 100)}...` : msg}
                </DropdownMenuItem>
              ))
            )}

          </DropdownMenuContent>

        </DropdownMenu>

        {/* User Info */}
        {(role !== 'admin' && role !== 'project_manager') && (
          <div className="text-sm text-gray-600 font-medium">
            {username} ({email})
          </div>
        )}

        {/* Logout Button */}
        <Button variant="destructive" onClick={() => logout()} disabled={isPending}>
          {isPending ? "Logging out..." : "Log Out"}
        </Button>
      </div>
    </header>
  )
}

export default Header
