import { fetchAllAssignmentsHook } from '@/hooks/use-Assignments-Hook';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useTaskRealtimeListeners from '@/Socket/SocketListeners';

const UserTaskcard = () => {


      useTaskRealtimeListeners()
      7
    //fetch Tasks
    const { data: taskData, isLoading, error } = fetchAllAssignmentsHook({});
    console.log(taskData);

    const statuses = ['planning', 'in_progress', 'completed'];

    const getTasksByStatus = (status: string) => {
        return taskData?.tasks?.filter((task: any) => task.status === status) || [];
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40 text-gray-400">
                <Loader2 className="animate-spin mr-2" />
                Loading tasks...
            </div>
        );
    }

    if (error) {
        return <p className="text-center">Failed to load tasks.</p>;
    }


      




    return (
        <div className="flex flex-col md:flex-row gap-6 p-6">
            {statuses.map((status) => (
                <div
                    key={status}
                    className={`flex-1 border rounded-lg shadow-sm p-4  min-h-[70vh] overflow-y-auto ${status === 'planning' ? 'bg-yellow-50'
                            : status === 'in_progress' ? 'bg-blue-50'
                                : status === 'completed' ? 'bg-green-50' : ""
                        }`}
                >
                    <h2 className="text-lg font-bold capitalize mx-5 mb-4 border-b pb-2">
                        {status}
                    </h2>

                    {getTasksByStatus(status).length === 0 ? (
                        <p className="text-sm text-gray-400 text-center">No tasks</p>
                    ) : (
                        getTasksByStatus(status).map((task: any) => (
                            <Card key={task.id} className={`mb-3 border shadow-sm hover:shadow-md transition `}>
                                <CardContent className="p-4 flex flex-col h-full">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{task.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                                    </div>
                                    <div className="mt-auto text-right">



                                        <Link
                                            to="/viewTask"
                                            state={{ task }}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            View Details
                                        </Link>

                                    </div>
                                </CardContent>

                            </Card>
                        ))
                    )}
                </div>
            ))}
        </div>

    );
};

export default UserTaskcard;