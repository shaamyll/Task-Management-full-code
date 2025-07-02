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
Object.defineProperty(exports, "__esModule", { value: true });
const comment_service_1 = require("../services/comment.service");
const Redis_1 = require("../config/Redis");
const socket_1 = require("../socket/socket");
class CommentController {
    constructor() {
        this.commentService = new comment_service_1.CommentService();
        this.createComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const { content } = req.body;
                const taskId = parseInt(req.params.taskId);
                if (!userId || !content || isNaN(taskId)) {
                    res.status(400).json({ message: "Missing or invalid required fields" });
                }
                const comment = yield this.commentService.createComment({
                    content,
                    taskId,
                    userId,
                });
                //Clear cache
                yield (0, Redis_1.clearTaskCache)(taskId);
                res.status(201).json({
                    message: "Comment added successfully",
                    comment,
                });
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
        this.deleteComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const commentId = parseInt(req.params.commentId);
                const { taskId } = yield this.commentService.deleteComment(commentId);
                socket_1.io.to('global-status-room').emit('commentDeleted', {
                    commentId,
                    taskId,
                });
                yield (0, Redis_1.clearTaskCache)();
                res.status(201).json({ message: "Comment Deleted Successfully" });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: err.message });
            }
        });
    }
}
exports.default = CommentController;
