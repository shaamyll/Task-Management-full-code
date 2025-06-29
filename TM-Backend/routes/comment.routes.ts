import { Router } from 'express'
import CommentController from '../controllers/comment.controller'
import authMiddleware from '../middlewares/authentication.middleware'
import Route from '../interfaces/route.interface'


class commentRoutes implements Route {

    public router = Router()
    public commentController = new CommentController()
    public path = '/comment'

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {

        this.router.post(`${this.path}/create/:taskId`, authMiddleware, this.commentController.createComment);

        this.router.delete(`${this.path}/delete/:commentId`, authMiddleware, this.commentController.deleteComment);


    }

}

export default commentRoutes
