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
      public async deleteComment(id:number): Promise<void> {
          const user = await Comment.findOne({where : {id}})
          if(!user){
              throw{ status:404 , message:"User not found"}
          }
  
          const deleteUser = await Comment.destroy({where:{id}})
      }

}
