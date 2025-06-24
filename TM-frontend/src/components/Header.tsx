import  { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Header() {
  const [email, setEmail] = useState("")
  const [username,setUsername] = useState("")
  const navigate = useNavigate()

  const {mutate:logout,isPending} = useMutation({
    mutationFn: async()=>{
      await new Promise((res)=>setTimeout(res,500))
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('username');
    },
    onSuccess:()=>{
      toast.error("Logged out");
      navigate('/')
    }
  })

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
    {/* {email && (
      <p className="text-sm text-gray-600 font-medium">
        {username} ({email})
      </p>
    )} */}
    <Button variant="destructive" onClick={()=>logout()} disabled={isPending}>
      {
        isPending?"Logging out..":"Log Out"
      }
    </Button>
  </div>
</header>
  )
}

export default Header
