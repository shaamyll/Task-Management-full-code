import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useUpdateTask } from '@/hooks/use-Task-Hook'
import { emitStatusUpdate } from '@/Socket/SocketEvents'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const UpdateStatus = ({ task }: { task: any }) => {
  const [currentStatus, setCurrentStatus] = useState(task.status)

  const { mutate, isPending } = useUpdateTask({
    taskId: task.id,
    onSuccess: () => {
    },
  })

 const handleChange = (newStatus: string) => {
  setCurrentStatus(newStatus);
  mutate(
    { status: newStatus },
    {
      onSuccess: () => {
        emitStatusUpdate(task.title, newStatus); 
        // toast.success(`Task "${task.title}" Status updated to "${newStatus}"`);
      },
      onError: () => {
        toast.error('Failed to update status');
      },
    }
  );
};



  return (
    <div>
      <Label className="m-2 text-gray-500 text-sm">Change status</Label>
      <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger className="w-48 h-8 text-xs">
          <SelectValue placeholder="Change status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="planning">Planning</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default UpdateStatus
