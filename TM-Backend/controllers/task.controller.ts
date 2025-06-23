import { Request, Response, NextFunction } from 'express';
import { createTaskDTO } from '../dtos/task.dto';
import TaskServices from '../services/task.services';


class TaskController {
    public taskService = new TaskServices();

    public createTask = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const taskData:createTaskDTO = req.body;
            const userId = req.user.id;
            if(!userId){
            res.status(401).json({message:"Unauthorized"});
            }
            const data = await this.taskService.createTask(taskData,req.user.id);
            res.status(201).json({message:"Task Created Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


     public fetchAllTasks = async (req: Request, res: Response , next:NextFunction) => {

        try {
            const data = await this.taskService.fetchAllTasks();
            res.status(201).json({message:"All Tasks fetched Successfully",data});

        } catch(err:any){
            res.status(err.status??500).json({message:err.message??"Something went wrong"})
        }
    }


}

export default TaskController;