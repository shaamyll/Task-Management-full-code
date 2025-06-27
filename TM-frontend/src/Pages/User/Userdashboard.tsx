import Header from '@/components/Header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
import { allTaskHook } from '@/hooks/AllTask-Hook'
import React from 'react'


const Userdashboard = () => {
    const [startDateFilter, setStartDateFilter] = React.useState<Date | undefined>()
    const [endDateFilter, setEndDateFilter] = React.useState<Date | undefined>()

    const [searchTitle, setSearchTitle] = useState('');
    const [statusFilter, setStatusFilter] = useState('');



    const filters = {
        searchTitle: searchTitle,
        filterStatus: statusFilter,
        filterStartDate: startDateFilter ? startDateFilter.toISOString() : null,
        filterEndDate: endDateFilter ? endDateFilter.toISOString() : null
    }


  //fetch task hook
  const { data, isLoading } = allTaskHook(filters)


  if (isLoading) return <div>Loading...</div>

  const plannedTasks = data?.data?.filter((task: any) => task.status === 'planning') || [];
  const inProgressTasks = data?.data?.filter((task: any) => task.status === 'in_progress') || [];
  const completedTasks = data?.data?.filter((task: any) => task.status === 'completed') || [];

  const renderTasks = (tasks: any[]) =>
    tasks.map((task: any,index:number) => (
      <Card key={task.id} className="hover:shadow-md mb-4">
        <CardHeader>
          <CardTitle className='text-lg'>{index+1}.  {task.title}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent >
          <p className='font-sm text-gray-600'>" {task.description} "</p>
        </CardContent>
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
{/* 
          <span className="w-96 flex items-center gap-2">
    <Search className="text-gray-500" />
    <Input onChange={(e)=>setSearchTitle(e.target.value)} placeholder="Search" className="w-full" />
  </span> */}

      </div>

    
      <div className="flex flex-col md:flex-row gap-4 p-4 mt-5 w-94 h-[650px]">
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-blue-100">
          <h2 className="text-xl font-semibold mb-2 m-1" >Planning</h2> <br />        {renderTasks(plannedTasks)}
        </div>
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-yellow-100">
          <h2 className="text-xl font-semibold mb-2 m-1">In Progress</h2> <br />
          {renderTasks(inProgressTasks)}
        </div>
        <div className="flex-1 rounded shadow-md p-5 m-2 border border-gray-300 bg-green-100">
          <h2 className="text-xl font-semibold mb-2 m-1">Completed</h2> <br />
          {renderTasks(completedTasks)}
        </div>
      </div>
    </div>  
  )
}

export default Userdashboard
