import { Router, Request, Response } from 'express';
import Route from '../interfaces/route.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { createTaskDTO } from '../dtos/task.dto';
import TaskController from '../controllers/task.controller';
import authMiddleware from '../middlewares/authentication.middleware';


class TaskRoutes implements Route {
    public router = Router();

    public path = '/task';

    public taskController = new TaskController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/createTask`, authMiddleware, validationMiddleware(createTaskDTO, 'body'), this.taskController.createTask);

        this.router.get(`${this.path}/getAllTasks`, authMiddleware, this.taskController.fetchAllTasks);

        //Delete Task
        this.router.delete(`/deleteTask/:id`, authMiddleware, this.taskController.deleteTask);

        //Update task
        this.router.put(`/updateTask/:id`, authMiddleware, this.taskController.updateTask);

        //Assign
        this.router.patch(`${this.path}/assignTask/:taskId`, authMiddleware, this.taskController.assignTask);

        //Remove Assignment
        this.router.patch(`${this.path}/removeAssignment/:taskId`, authMiddleware, this.taskController.removeAssignment);

        //Assigned Tasks fetch
        this.router.get(`${this.path}/assignments`, authMiddleware, this.taskController.getAssignedTasks);

        //developers Tasks fetch
        this.router.get(`${this.path}/developersTasks`, authMiddleware, this.taskController.getDevelopersTasks);

    }

}

export default TaskRoutes;
