import { Request, Response, NextFunction } from 'express';
import { createTaskDTO } from '../dtos/task.dto';
import TaskServices from '../services/task.services';
import redis, { clearTaskCache } from '../config/Redis';

class TaskController {
    public taskService = new TaskServices();

    public createTask = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const taskData: createTaskDTO = req.body;
            const userId = req.user.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
            }
            const data = await this.taskService.createTask(taskData, req.user.id);
            res.status(201).json({ message: "Task Created Successfully", data });

        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" })
        }
    }


    public fetchAllTasks = async (req: Request, res: Response, next: NextFunction) => {

        try {

            const { searchTitle = '', filterStatus = '', filterStartDate = '', filterEndDate = '' } = req.query as {
                searchTitle?: string;
                filterStatus?: string;
                filterStartDate?: string;
                filterEndDate?: string
            };


            const data = await this.taskService.fetchAllTasks({ searchTitle, filterStatus, filterStartDate, filterEndDate });
            res.status(200).json({ message: "All Tasks fetched Successfully", data });

        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" })
        }
    }


    public deleteTask = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const taskId = req.params.id as unknown as number;

            const data = await this.taskService.deleteTask(taskId);

            //clearing cahce logic
           await clearTaskCache(taskId)

            res.status(201).json({ message: "Task Deleted Successfully", data });

        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" })
        }
    }


    //Update user
    public updateTask = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const updatedData = req.body as createTaskDTO
            const taskId = req.params.id as unknown as number;
            const data = await this.taskService.updateTask(req.params.id, updatedData)

            //clear cache
           await clearTaskCache(taskId);

            res.status(200).json({ message: "Task Updated Successfully", data });

        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Something went wrong" })
        }
    }


    //Assign Task
    public assignTask = async (req: Request, res: Response, next: NextFunction) => {
        const { taskId } = req.params;
        const { assignedTo } = req.body;

        try {
            const task = await this.taskService.assignTask(Number(taskId), assignedTo);

            //clear cache
            await clearTaskCache(Number(taskId));

            res.status(200).json({ message: `Task Assigned successfully`, task });
        } catch (err: any) {
            res.status(err.status || 500).json({ message: err.message || "task Assigning failed" });
        }
    };


    //Remove Assignment
    public removeAssignment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const taskId = req.params.taskId;

        if (!taskId) {
            res.status(400).json({ message: "Task ID is required" });
        }

        try {
            const task = await this.taskService.removeAssignment(Number(taskId));

            //clear cache
            await clearTaskCache();

            res.status(200).json({
                message: "Assignment removed successfully",
                task
            });
        } catch (err: any) {
            res.status(err.status ?? 500).json({ message: err.message ?? "Failed to remove assignment" });
        }
    };



    // Get All Assigned Tasks
    public getAssignedTasks = async (req: Request, res: Response) => {
        try {
            const { searchTitle = '', filterStatus = '' } = req.query as {
                searchTitle?: string;
                filterStatus?: string;
            };

            const filters = { searchTitle, filterStatus };

            const cacheKey = `tasks:assigned:${searchTitle}:${filterStatus}`;

            // Try Redis first
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] ${cacheKey}`);
                 res.status(200).json({
                    message: "Fetched from cache",
                    tasks: JSON.parse(cached),
                });
                return;
            }

            console.log(`[CACHE MISS] ${cacheKey}`);


            const tasks = await this.taskService.getAssignedTasks(filters);

            await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);


            res.status(200).json({
                message: "Assigned tasks fetched successfully",
                tasks,
            });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };


    // Get Developer's Assigned Tasks
    public getDevelopersTasks = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;

            const { searchTitle = '', filterStatus = '' } = req.query as {
                searchTitle?: string;
                filterStatus?: string;
            };

            const filters = { searchTitle, filterStatus };

            //cache Key
            const cacheKey = `tasks:developer:${userId}:${searchTitle}:${filterStatus}`;

            // Try Redis first
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT:Developer] ${cacheKey}`);
                 res.status(200).json({
                    message: "Developer tasks fetched successfully (from cache)",
                    tasks: JSON.parse(cached),
                });
                return;
            }

            const tasks = await this.taskService.getDevelopersTasks(userId, filters);

            // set data in cache
            await redis.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);


            res.status(200).json({
                message: "Developers tasks fetched successfully",
                tasks,
            });

        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    };


}

export default TaskController;