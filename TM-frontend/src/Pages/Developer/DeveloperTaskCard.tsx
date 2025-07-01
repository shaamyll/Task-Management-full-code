import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import {  useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { fetchDevelopersTasksHook } from '@/hooks/use-Assignments-Hook'
import UpdateStatus from './UpdateStatus'
import CommentSection from '@/components/CommentSection'
import useTaskRealtimeListeners from '@/Socket/SocketListeners'

const DeveloperTaskCard = () => {
  const [searchTitle, setSearchTitle] = useState<string | undefined>('')
  const [statusFilter, setStatusFilter] = useState<string | undefined>('')
  const [role] = useState(localStorage.getItem('role'))

  const filters = {
    searchTitle,
    filterStatus: statusFilter,
  }

  const { data: taskData, isLoading } = fetchDevelopersTasksHook(filters)

  const Reset = () => {
    setSearchTitle('')
    setStatusFilter('')
  }


  useTaskRealtimeListeners()
 
  return (
    <div>
      {/* Filters */}
      <div className="flex justify-end gap-4 px-10 pt-6">
  <Input
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
    placeholder="Search tasks..."
    className="w-64 shadow-md"
  />


    <>
      <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
        <SelectTrigger className="w-48 shadow-md">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="planning">Planning</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {(statusFilter || searchTitle) && (
        <Button onClick={Reset}>
          Reset
        </Button>
      )}
    </>
 
</div>




      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-5">
        {isLoading ? (
          <div className="col-span-full text-center text-gray-600">
            <Loader2 className="animate-spin inline-block mr-2" />
            Loading tasks...
          </div>
        ) : taskData?.tasks?.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No tasks assigned</p>
        ) : (
          (taskData?.tasks?? []).map((task: any) => (
            <Card
              key={task.id}
              className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full text-white font-medium ${
                      task.status === 'planning'
                        ? 'bg-yellow-500'
                        : task.status === 'in_progress'
                        ? 'bg-blue-500'
                        : task.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  >
                    {task.status.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-gray-600 mb-3 line-clamp-3">{task.description || 'No description'}</p>

                <div className="text-sm text-gray-500 flex justify-between mb-4">
                  <p>📅 Start: {new Date(task.startDate).toLocaleDateString()}</p>
                  <p>📆 End: {task.endDate ? new Date(task.endDate).toLocaleDateString() : '-'}</p>
                </div>

                <div className="flex justify-between items-center">
              
                  {
                    (role === 'developer') && (
                        <UpdateStatus task={task} />
                    ) 
                  }
                </div>

                <CommentSection comments={task.comments} taskId={task.id} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default DeveloperTaskCard
