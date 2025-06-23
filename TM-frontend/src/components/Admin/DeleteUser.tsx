import { deleteUserAPI } from '@/services/AllAPIs';
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

const DeleteUser = ({ user }: { user: any }) => {

    const queryClient = useQueryClient()

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: async (userId: number) => {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }
            const header = {
                Authorization: `${token}`,
                'Content-Type': 'application/json'
            };
            const response = await deleteUserAPI(userId, header)
            return response
        },
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["userData"] })
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
                    <Button variant="outline" size="sm" className="rounded bg-red-600 text-white">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white rounded'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete user <strong>{user.username}</strong>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            className="rounded bg-white text-black border-gray-300"
                        >Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white rounded"
                            disabled={isPending}
                            onClick={() => deleteUser(user.id)}
                        >
                            {isPending ? "Deleting..." : "Yes, Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}

export default DeleteUser