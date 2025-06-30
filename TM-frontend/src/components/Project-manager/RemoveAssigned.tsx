import { Button } from '../ui/button'
import { toast } from 'sonner';
import { useRemoveAssignment } from '@/hooks/use-Assignments-Hook';
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


const RemoveAssigned = ({task,assignedUser}:{task:any,assignedUser:any}) => {

    //Remove Assignment
const { mutate:removeAssignment,isPending} = useRemoveAssignment()

const handleRemove = (taskId: number) => {
  console.log("Remove button clicked", taskId);
  removeAssignment(
    { taskId },
    {
      onSuccess: (res) => {
        console.log("Success", res);
        toast.success(res.message);
      },
      onError: (err: any) => {
        console.error("Remove Error", err);
        toast.error(err?.response?.data?.message || "Failed to remove assignment");
      },
    }
  );
};

  return (
    <div>

        <AlertDialog>
                <AlertDialogTrigger asChild>
                            <Button >Remove</Button>

                </AlertDialogTrigger>
                <AlertDialogContent className='bg-white rounded'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete User?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove the assignment from user <strong>{assignedUser.username}</strong>? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            
                        >Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white rounded"
                            disabled={isPending}
                            onClick={() =>handleRemove(task.id) }
                        >
                            {isPending ? "Removing..." : "Yes, Remove"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
    </div>
  )
}

export default RemoveAssigned