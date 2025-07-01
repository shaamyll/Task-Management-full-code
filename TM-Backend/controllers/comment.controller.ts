import { NextFunction, Request, Response } from "express";
import { CommentService } from "../services/comment.service";
import redis, { clearTaskCache } from "../config/Redis";
import { io } from "../socket/socket";

class CommentController {
  public commentService = new CommentService();

  public createComment = async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const { content } = req.body;
      const taskId = parseInt(req.params.taskId);

      if (!userId || !content || isNaN(taskId)) {
        res.status(400).json({ message: "Missing or invalid required fields" });
      }

      const comment = await this.commentService.createComment({
        content,
        taskId,
        userId,
      });

      //Clear cache
      await clearTaskCache(taskId);


      res.status(201).json({
        message: "Comment added successfully",
        comment,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  };




public deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.commentId);

    const { taskId } = await this.commentService.deleteComment(commentId);

     io.to('global-status-room').emit('commentDeleted', {
      commentId,
      taskId,
    });
    
    await clearTaskCache();

    res.status(201).json({ message: "Comment Deleted Successfully" });
  } catch (err: any) {
    res.status(err.status ?? 500).json({ message: err.message });
  }
};


}

export default CommentController;
