import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, ChevronDown, ChevronUp, Trash2, Loader2 } from "lucide-react"
import { useAddComment, useDeleteComment } from "@/hooks/Comment-Hook"
import { format } from "timeago.js"

type CommentSectionProps = {
  comments: any[]
  taskId: number
}

const CommentSection = ({ comments, taskId }: CommentSectionProps) => {
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState("")
  const [role] = useState(localStorage.getItem("role"))

  const currentUserId = Number(localStorage.getItem("userId"))

  const { mutate: addComment, isPending: addingComment } = useAddComment()
  const { mutate: deleteComment, isPending: deletingComment } = useDeleteComment()

  return (
    <div className="mt-4 border-t pt-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground px-1"
        onClick={() => setShowComments((prev) => !prev)}
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        {showComments ? (
          <>
            Hide Comments <ChevronUp className="h-4 w-4 ml-1" />
          </>
        ) : (
          <>
            {comments.length} Comments
            <ChevronDown className="h-4 w-4 ml-1" />
          </>
        )}
      </Button>

      {showComments && (
        <div className="mt-3 space-y-3">
          {/* Comments */}
          <div className="space-y-3 max-h-60 overflow-y-auto p-2 rounded-md bg-gray-50 border">
            {comments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            ) : (
              comments.map((c) => {
                const isCurrentUser = c.userId === currentUserId
                return (
                  <div
                    key={c.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <Card
                      className={` w-[85%]  p-3 shadow-md rounded-md border text-sm ${isCurrentUser ? "bg-blue-50 ml-auto" : "bg-white mr-auto"
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-gray-800 whitespace-pre-wrap break-words">
                          {c.content}
                        </p>
                        <p>  <span className="text-sm text-gray-500">- {c.User?.username || "You"}</span></p>
                               
                      </div>

                      <div className="text-left flex justify-between text-sm text-muted-foreground">
                        <p className="text-xs">{format(c.createdAt)}</p>

                        {isCurrentUser && (
                          <div className="flex items-center gap-2 ml-4">
                            
                          
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteComment({ commentId: c.id })}
                              disabled={deletingComment}
                        
                            >
                              {deletingComment ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>


                  </div>
                )
              })
            )}
          </div>

          {/*  Comment Input */}
          {
            (role !== "user") && (
              <div className="flex flex-col gap-2">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="text-sm"
            />
            <Button
              size="sm"
              disabled={!comment || addingComment}
              onClick={() =>
                addComment(
                  { taskId, content: comment },
                  {
                    onSuccess: () => setComment(""),
                  }
                )
              }
            >
              {addingComment ? "Posting..." : "Add Comment"}
            </Button>
          </div>
            )
          }


        </div>
      )}
    </div>
  )
}

export default CommentSection
