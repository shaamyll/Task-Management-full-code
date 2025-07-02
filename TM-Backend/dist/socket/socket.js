"use strict";
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
exports.io = exports.createSocketServer = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const Task_1 = require("../models/Task");
let io;
const createSocketServer = (app) => {
    const httpServer = http_1.default.createServer(app);
    exports.io = io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        // Register user to rooms
        socket.on('registerUser', (userId) => {
            socket.join(`user-${userId}`);
            socket.join('global-status-room');
        });
        //  new comment
        socket.on('newComment', (_a) => __awaiter(void 0, [_a], void 0, function* ({ taskId, comment }) {
            io.to('global-status-room').emit('receiveCommentUpdate', { taskId, comment });
            const task = yield Task_1.Task.findByPk(taskId, { attributes: ['title'] });
            const message = task && `New comment "${comment.content}" on task ${task.title}`;
            io.to('global-status-room').emit('receiveCommentNotification', { taskId, comment, message });
        }));
        //  status update
        socket.on('statusUpdate', ({ taskId, status, title }) => {
            io.to('global-status-room').emit('receiveStatusUpdate', {
                taskId,
                status,
                title,
                message: `Task #${title} is "${status}"`,
            });
        });
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
    return httpServer;
};
exports.createSocketServer = createSocketServer;
