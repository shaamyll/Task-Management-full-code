import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { deleteTaskAPI } from '@/services/AllAPIs';


const DeleteTask = ({ task }: { task: any }) => {

    const queryClient = useQueryClient()


    const { mutate:deleteTask,isPending } = useMutation({
        mutationFn: async (taskId: number) => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            };
            const response = await deleteTaskAPI(taskId , header)
            return response
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["taskKey"] })  //State management of tasks bwtween components
            console.log(res)
             toast.success(res.data?.message)   
        },
        onError: (data) => {
            console.log(data)
        }
    })
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white rounded'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete Task: <strong>{task.title}</strong> ? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel

                        >Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white rounded"
                            disabled={isPending}
                            onClick={()=>deleteTask(task.id)}
                        >
                            {isPending ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DeleteTask