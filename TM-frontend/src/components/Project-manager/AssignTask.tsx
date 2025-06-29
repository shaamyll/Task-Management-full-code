import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from '../ui/button'
import { allUsersHook } from '@/hooks/AllUsers-Hook'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { allTaskHook } from "@/hooks/AllTask-Hook"
import { useState } from "react"
import { fetchAllAssignmentsHook, useAssignTask } from "@/hooks/Assignments-Hook"
import { toast } from "sonner"
import RemoveAssigned from "./RemoveAssigned"


const AssignTask = () => {

  const [seletctedTask, setSelectedTask] = useState<string | undefined>('')
  const [seletctedDeveloper, setSelectedDeveloper] = useState<string | undefined>('')


  //Developers
  const { data: userData, isLoading: loadingUsers } = allUsersHook()

  const developerUsers = userData?.data?.filter((user: any) => user.role === 'developer') || []


  //All tasks
  const { data: taskdata, isLoading: loadingTasks } = allTaskHook()

  const allTasks = taskdata?.data?.filter((task: any) => task.assignedTo === null)

  //API
  const { mutate: assignTask, isPending } = useAssignTask()


  function assign() {
    if (!seletctedTask || !seletctedDeveloper) {
      toast.error("Please select task and developer");
      return;

    }

    assignTask(
      {
        taskId: Number(seletctedTask),
        userId: Number(seletctedDeveloper),
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setSelectedDeveloper(undefined)
          setSelectedTask(undefined)
        },
        onError: (err: any) => {
          console.error(err.response);
        },
      }
    );
  }

    const [searchTitle] = useState<string | undefined>('')
  const [statusFilter] = useState<string | undefined>('')

  const filters = {
    searchTitle,
    filterStatus: statusFilter,
  }
  //fetch all assignments
  const { data: assignments, isLoading: loadingAssignments } = fetchAllAssignmentsHook(filters)
  console.log(assignments)


  return (
    <div>
      <div className="p-10 border border-gray-200 shadow-md rounded mt-3 flex flex-col gap-6">

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col w-[30rem]">
            <label htmlFor="task" className="mb-2 text-sm font-medium text-gray-700">
              Select Task
            </label>
            <Select value={seletctedTask} onValueChange={setSelectedTask}>
              <SelectTrigger
                id="task"

              >
                <SelectValue placeholder="Select task" />
              </SelectTrigger>
              <SelectContent >
                {
                  loadingTasks ? (
                    <SelectItem value="loading"><Loader2 className="animate-spin h-4 w-4" /></SelectItem>
                  ) : (
                    !allTasks || allTasks.length == 0 ? (<SelectItem value="no tasks" disabled>No pending Tasks</SelectItem>) :
                      (allTasks.map((task: any) => (
                        <SelectItem key={task.id} value={String(task.id)}>{task.title} <span className="text-gray-500 px-2">( {task.status} )</span></SelectItem>
                      )))
                  )
                }
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col w-[30rem]">
            <label htmlFor="developer" className="mb-2 text-sm font-medium text-gray-700">
              Choose a Developer
            </label>
            <Select onValueChange={setSelectedDeveloper} value={seletctedDeveloper}>
  <SelectTrigger id="developer">
    <SelectValue placeholder="Select developer" />
  </SelectTrigger>
  <SelectContent>
    {loadingUsers ? (
      <SelectItem value="loading" disabled>
        <Loader2 className="animate-spin h-4 w-4" />
      </SelectItem>
    ) : (
      developerUsers.map((user: any) => (
        <SelectItem key={user.id} value={String(user.id)}>
          {user.username} <span className="text-gray-600 mx-8">({user.email})</span>
        </SelectItem>
      ))
    )}
  </SelectContent>
</Select>

          </div>

          <div className="flex justify-end mt-7">
            <Button className="w-48" onClick={assign} disabled={isPending}>
              {isPending ? <span className="flex"><p>Assigning..</p><Loader2 className="animate-spin w-4 h-4" /></span> : "Assign Task"}
            </Button>

          </div>

        </div>


      </div>



      {/* Table */}
      <div className="overflow-x-auto mt-6 p-4 border border-gray-200 rounded-md shadow">
        <p className="p-2 px-7 text-2xl">Assignments:</p>
        <Table className="rounded  ">
          <TableHeader>
            <TableRow className=" rounded ">
              <TableHead className="w-12 px-6 py-4">#</TableHead>
              <TableHead className="px-6 py-4">Task</TableHead>
              <TableHead className="px-6 py-4">Developer</TableHead>
              <TableHead className="px-12 py-4">Email</TableHead>
              <TableHead className="px-7 py-4">Status</TableHead>
              <TableHead className="px-7 py-4">Start Date</TableHead>
              <TableHead className="px-6 py-4">End Date</TableHead>
              <TableHead className="text-right px-12 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

        <TableBody>
  {loadingAssignments ? (
    <TableRow>
      <TableCell colSpan={8} className="py-10 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Loader2 className="animate-spin w-7 h-7" />
          <span>Loading data...</span>
        </div>
      </TableCell>
    </TableRow>
  ) : (
    assignments.tasks
      ?.filter((task: any) => task.assignedTo !== null)
      .map((task: any, index: number) => (
        <TableRow key={task.id}>
          <TableCell className="px-6 py-4 text-center">{index + 1}</TableCell>
          <TableCell className="font-medium px-6 py-4">{task.title}</TableCell>
          <TableCell className="px-6 py-4">{task?.assignee?.username}</TableCell>
          <TableCell className="px-6 py-4">{task?.assignee?.email}</TableCell>
          <TableCell className="px-6 py-4">
            <span
              className={`inline-block px-4 py-1 text-sm font-medium text-white rounded-full capitalize shadow ${
                task.status === 'planning'
                  ? 'bg-yellow-500'
                  : task.status === 'in_progress'
                  ? 'bg-blue-400'
                  : task.status === 'completed'
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              }`}
            >
              {task.status.replace('_', ' ')}
            </span>
          </TableCell>
          <TableCell className="px-6 py-4">
            {new Date(task.startDate).toLocaleDateString()}
          </TableCell>
          <TableCell className="px-6 py-4">
            {task.endDate ? new Date(task.endDate).toLocaleDateString() : '_'}
          </TableCell>
          <TableCell className="px-6 py-4 text-right">
            <RemoveAssigned task={task} assignedUser={task.assignee?.username || ' '} />
          </TableCell>
        </TableRow>
      ))
  )}
</TableBody>




        </Table>
      </div>
    </div>
  )
}

export default AssignTask