import Header from '@/components/Header'
import { getAllTasksAPI } from '@/services/AllAPIs'
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

const Userdashboard = () => {
const [search,setSearch] = useState('')
  const filters = {
        search:search
      }
  const { data, isLoading } = useQuery({
    queryKey: ['taskData',filters],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = {
        Authorization: `${token}`,
        'Content-Type': 'application/json'
      }

    
      const response = await getAllTasksAPI(filters, headers)
      return response.data
    },
    refetchOnWindowFocus: true
  })

  if (isLoading) return <div>Loading...</div>

  const plannedTasks = data?.data?.filter((task: any) => task.status === 'planning') || [];
  const inProgressTasks = data?.data?.filter((task: any) => task.status === 'in_Progress') || [];
  const completedTasks = data?.data?.filter((task: any) => task.status === 'completed') || [];

  const renderTasks = (tasks: any[]) =>
    tasks.map((task: any) => (
      <Card key={task.id} className="hover:shadow-md mb-4">
        <CardHeader>
          <CardTitle className='text-lg'>{task.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent >
          <p className='font-sm text-gray-600'>" {task.description} "</p>
        </CardContent>
        {/* <CardFooter></CardFooter> */}
      </Card>
    ))

  return (
      <div className='w-full'>

      <div>
        <Header />
      </div>        
<br /><br />
      <div className='mt-14 flex items-center justify-between mx-10'>
          

        <p className='text-3xl'>All Tasks:</p>

          <span className="w-96 flex items-center gap-2">
    <Search className="text-gray-500" />
    <Input onChange={e=>setSearch(e.target.value)} placeholder="Search" className="w-full" />
  </span>
      </div>

    
      <div className="flex flex-col md:flex-row gap-4 p-4 mt-5 w-94">
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-blue-100">
          <h2 className="text-xl font-semibold mb-2 m-1" >Planning</h2>
          {renderTasks(plannedTasks)}
        </div>
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-yellow-100">
          <h2 className="text-xl font-semibold mb-2 m-1">In Progress</h2>
          {renderTasks(inProgressTasks)}
        </div>
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-green-100">
          <h2 className="text-xl font-semibold mb-2 m-1">Completed</h2>
          {renderTasks(completedTasks)}
        </div>
      </div>
    </div>  
  )
}

export default Userdashboard
