import { Comment } from "../models/Comment";

export class CommentService {
  // CREATE a comment
  public async createComment(data: {
    content: string;
    taskId: number;
    userId: number;
  }) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (err: any) {
      throw new Error(err.message || "Failed to create comment");
    }
  }


  //delete comment
      public async deleteComment(id:number): Promise<{taskId:number}> {
          const comment = await Comment.findOne({where : {id}})
          if(!comment){
              throw{ status:404 , message:"comment not found"}
          }

          const taskId = comment.taskId;
  
          await Comment.destroy({where:{id}})

          
          return {taskId}

          
      }

}
