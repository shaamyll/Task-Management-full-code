import { useDeleteComment } from '@/hooks/Comment-Hook'
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
import { Button } from './ui/button'
import { Loader2, Trash2 } from 'lucide-react'

type DeleteCommentProps = {
  commentId: number
  content: string
}

const DeleteComment = ({ commentId, content }: DeleteCommentProps) => {
  const { mutate: deleteComment, isPending: deletingComment } = useDeleteComment()

  const handleDelete = () => {
    deleteComment({ commentId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white rounded">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the following comment? This action cannot be undone.
          </AlertDialogDescription>

          <div className="bg-muted p-3 rounded-md mt-2 text-sm border">
            <blockquote className="italic text-gray-700 line-clamp-3">
              “{content}”
            </blockquote>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletingComment}
          >
            {deletingComment ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
              </span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteComment
