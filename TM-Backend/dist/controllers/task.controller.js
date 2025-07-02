"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_services_1 = __importDefault(require("../services/task.services"));
const Redis_1 = __importStar(require("../config/Redis"));
class TaskController {
    constructor() {
        this.taskService = new task_services_1.default();
        this.createTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const taskData = req.body;
                const userId = req.user.id;
                if (!userId) {
                    res.status(401).json({ message: "Unauthorized" });
                }
                const data = yield this.taskService.createTask(taskData, req.user.id);
                res.status(201).json({ message: "Task Created Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        this.fetchAllTasks = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { searchTitle = '', filterStatus = '', filterStartDate = '', filterEndDate = '' } = req.query;
                const data = yield this.taskService.fetchAllTasks({ searchTitle, filterStatus, filterStartDate, filterEndDate });
                res.status(200).json({ message: "All Tasks fetched Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        this.deleteTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const taskId = req.params.id;
                const data = yield this.taskService.deleteTask(taskId);
                //clearing cahce logic
                yield (0, Redis_1.clearTaskCache)(taskId);
                res.status(201).json({ message: "Task Deleted Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        //Update user
        this.updateTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const updatedData = req.body;
                const taskId = req.params.id;
                const data = yield this.taskService.updateTask(req.params.id, updatedData);
                //clear cache
                yield (0, Redis_1.clearTaskCache)(taskId);
                res.status(200).json({ message: "Task Updated Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        //Assign Task
        this.assignTask = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const { assignedTo } = req.body;
            try {
                const task = yield this.taskService.assignTask(Number(taskId), assignedTo);
                //clear cache
                yield (0, Redis_1.clearTaskCache)(Number(taskId));
                res.status(200).json({ message: `Task Assigned successfully`, task });
            }
            catch (err) {
                res.status(err.status || 500).json({ message: err.message || "task Assigning failed" });
            }
        });
        //Remove Assignment
        this.removeAssignment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const taskId = req.params.taskId;
            if (!taskId) {
                res.status(400).json({ message: "Task ID is required" });
            }
            try {
                const task = yield this.taskService.removeAssignment(Number(taskId));
                //clear cache
                yield (0, Redis_1.clearTaskCache)();
                res.status(200).json({
                    message: "Assignment removed successfully",
                    task
                });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Failed to remove assignment" });
            }
        });
        // Get All Assigned Tasks
        this.getAssignedTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchTitle = '', filterStatus = '' } = req.query;
                const filters = { searchTitle, filterStatus };
                const cacheKey = `tasks:assigned:${searchTitle}:${filterStatus}`;
                // Try Redis first
                const cached = yield Redis_1.default.get(cacheKey);
                if (cached) {
                    console.log(`[CACHE HIT] ${cacheKey}`);
                    res.status(200).json({
                        message: "Fetched from cache",
                        tasks: JSON.parse(cached),
                    });
                    return;
                }
                console.log(`[CACHE MISS] ${cacheKey}`);
                const tasks = yield this.taskService.getAssignedTasks(filters);
                yield Redis_1.default.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);
                res.status(200).json({
                    message: "Assigned tasks fetched successfully",
                    tasks,
                });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        // Get Developer's Assigned Tasks
        this.getDevelopersTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { searchTitle = '', filterStatus = '' } = req.query;
                const filters = { searchTitle, filterStatus };
                //cache Key
                const cacheKey = `tasks:developer:${userId}:${searchTitle}:${filterStatus}`;
                // Try Redis first
                const cached = yield Redis_1.default.get(cacheKey);
                if (cached) {
                    console.log(`[CACHE HIT:Developer] ${cacheKey}`);
                    res.status(200).json({
                        message: "Developer tasks fetched successfully (from cache)",
                        tasks: JSON.parse(cached),
                    });
                    return;
                }
                const tasks = yield this.taskService.getDevelopersTasks(userId, filters);
                // set data in cache
                yield Redis_1.default.set(cacheKey, JSON.stringify(tasks), 'EX', 3600);
                res.status(200).json({
                    message: "Developers tasks fetched successfully",
                    tasks,
                });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.default = TaskController;
