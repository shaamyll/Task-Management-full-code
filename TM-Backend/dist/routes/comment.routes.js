"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
class commentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.commentController = new comment_controller_1.default();
        this.path = '/comment';
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create/:taskId`, authentication_middleware_1.default, this.commentController.createComment);
        this.router.delete(`${this.path}/delete/:commentId`, authentication_middleware_1.default, this.commentController.deleteComment);
    }
}
exports.default = commentRoutes;
