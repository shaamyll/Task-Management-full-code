import Header from '@/components/Header'
import { Input } from '@/components/ui/input'
import { Loader2, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { allTaskHook } from '@/hooks/AllTask-Hook'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'


const DeveloperDashboard = () => {
    const [searchTitle, setSearchTitle] = useState('')
    const [developerId, setDeveloperId] = useState<number | null>(null)
    const [statusFilter, setStatusFilter] = useState<string | undefined>('')

    const filters = {
        searchTitle,
        filterStatus: statusFilter,
    }

    const { data: taskData, isLoading } = allTaskHook(filters)

    // Filter assigned tasks for current developer
    const assignedTasks = taskData?.data?.filter(
        (task: any) =>
            task.assignedTo === developerId
    )

    useEffect(() => {
        const storedId = localStorage.getItem('userId')
        if (storedId) setDeveloperId(Number(storedId))
    }, []);


    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            <Header />
            <div className="mx-10 mt-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                    <p className="text-3xl font-semibold">Tasks</p>
                    <p>Developers can update status and comment on their tasks.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-5">
                    <span className="w-80 flex items-center  rounded-lg shadow-md">
                        <Input
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            placeholder="Search tasks..."
                            className='w-64'
                        />
                    </span>
                    <Select
                        value={statusFilter ?? undefined}
                        onValueChange={(value) => setStatusFilter(value)}>                       
                         <SelectTrigger id="role" className='shadow-md'>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent >

                            <SelectItem
                                value="planning"

                            >
                                Planning
                            </SelectItem>

                            <SelectItem
                                value="in_progress"
                            >
                                In Progress
                            </SelectItem>

                            <SelectItem
                                value="completed"
                            >
                                Completed
                            </SelectItem>
                            <SelectItem
                                value="cancelled"
                            >
                                Cancelled
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    {(statusFilter || searchTitle) && (
                        <Button
                            onClick={() => {
                                setStatusFilter(undefined);
                                setSearchTitle('');
                            }}
                        >
                            Reset
                        </Button>
                    )}


                </div>


            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 mt-5 overflow-y-auto max-h-[550px]">
                {isLoading ? (
                    <div className='flex text-center'><p className="text-gray-600">Loading tasks <Loader2 className='animate-spin h-4 w-4' /></p></div>
                ) : assignedTasks?.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center">No tasks assigned</p>
                ) : (
                    assignedTasks.map((task: any) => (
                        <Card
                            key={task.id}
                            className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            <CardContent className="p-5">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">{task.title}</h2>
                                    <span
                                        className={`px-3 py-1 text-sm rounded-full text-white font-medium ${task.status === 'planning'
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
                                <div className="text-sm text-gray-500 flex justify-between">
                                    <p>📅 Start: {new Date(task.startDate).toLocaleDateString()}</p>
                                    <p>📆 End: {task.endDate ? new Date(task.endDate).toLocaleDateString() : '-'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

export default DeveloperDashboard
