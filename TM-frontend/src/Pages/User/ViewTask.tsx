import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useTaskRealtimeListeners from '@/Socket/SocketListeners';

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const ViewTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  if (!task) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">No task data provided.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  useTaskRealtimeListeners()
  return (
    <div className="p-6 max-w-4xl mx-auto mt-14">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{task.title} Details</h2>
        <Button onClick={() => navigate(-1)} >Back</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description || 'No description provided.'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><strong>Status:</strong> {task.status.replace('_', ' ')}</p>
            <p><strong>Assigned To:</strong> {task.assignee?.username || 'Unassigned'} ( {task.assignee.email} )</p>
            <p><strong>Start Date:</strong> {formatDateTime(task.startDate)}</p>
            <p><strong>End Date:</strong> {task.endDate ? formatDateTime(task.endDate) : '—'}</p>
          </div>

        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">Comments</h3>

      <Card>
        <CardContent className="p-4 space-y-4">
          {task.comments?.length > 0 ? (
            task.comments.map((comment: any) => (
              <div key={comment.id} className="border-b pb-2">
                <p className="text-sm text-gray-800">
                 <p className='font-semibold text-gray-500'>- {comment.User?.username}</p> 
                 <p className='text-lg mt-2'>{comment.content}</p>
                </p>
                <p className="text-xs text-gray-400">{formatDateTime(comment.createdAt)}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No comments available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewTask;