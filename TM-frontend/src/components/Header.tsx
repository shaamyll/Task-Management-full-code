import  { useEffect, useState } from 'react'
import { Button } from './ui/button'

function Header() {
  const [email, setEmail] = useState("")
  const [username,setUsername] = useState("")

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) setEmail(storedEmail)
        const storedUsername = localStorage.getItem('username')
        if(storedUsername) setUsername(storedUsername)
  }, [])

  return (
   <header className="fixed z-50 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
  <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>

  <div className="flex items-center gap-4">
    {email && (
      <p className="text-sm text-gray-600 font-medium">
        {username} ({email})
      </p>
    )}
    <Button className="bg-black text-white hover:bg-gray-800 px-4 py-2 rounded">
      Logout
    </Button>
  </div>
</header>
  )
}

export default Header
