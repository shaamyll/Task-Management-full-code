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


const Userdashboard = () => {


    //Fetching All tasks
    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ['taskData'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            }
            const response = await getAllTasksAPI(header)
            return response.data
        },
        refetchOnWindowFocus:false
    })

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isSuccess) {
        console.log("User Data:", data);
    }

    return (
        <div>
            <Header />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {
                data?.data?.map((task:any) => (
                    <Card key={task.id} className='hover:shadow-md'>
                        <CardHeader>
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription> </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{task.description}</p>
                        </CardContent>
                        <CardFooter>
                            <p>Status: {task.status}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default Userdashboard