"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const task_dto_1 = require("../dtos/task.dto");
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
class TaskRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.path = '/task';
        this.taskController = new task_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/createTask`, authentication_middleware_1.default, (0, validation_middleware_1.default)(task_dto_1.createTaskDTO, 'body'), this.taskController.createTask);
        this.router.get(`${this.path}/getAllTasks`, authentication_middleware_1.default, this.taskController.fetchAllTasks);
        //Delete Task
        this.router.delete(`/deleteTask/:id`, authentication_middleware_1.default, this.taskController.deleteTask);
        //Update task
        this.router.put(`/updateTask/:id`, authentication_middleware_1.default, this.taskController.updateTask);
        //Assign
        this.router.patch(`${this.path}/assignTask/:taskId`, authentication_middleware_1.default, this.taskController.assignTask);
        //Remove Assignment
        this.router.patch(`${this.path}/removeAssignment/:taskId`, authentication_middleware_1.default, this.taskController.removeAssignment);
        //Assigned Tasks fetch
        this.router.get(`${this.path}/assignments`, authentication_middleware_1.default, this.taskController.getAssignedTasks);
        //developers Tasks fetch
        this.router.get(`${this.path}/developersTasks`, authentication_middleware_1.default, this.taskController.getDevelopersTasks);
    }
}
exports.default = TaskRoutes;
