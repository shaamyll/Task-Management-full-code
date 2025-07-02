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
exports.CommentService = void 0;
const Comment_1 = require("../models/Comment");
class CommentService {
    // CREATE a comment
    createComment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield Comment_1.Comment.create(data);
                return comment;
            }
            catch (err) {
                throw new Error(err.message || "Failed to create comment");
            }
        });
    }
    //delete comment
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield Comment_1.Comment.findOne({ where: { id } });
            if (!comment) {
                throw { status: 404, message: "comment not found" };
            }
            const taskId = comment.taskId;
            yield Comment_1.Comment.destroy({ where: { id } });
            return { taskId };
        });
    }
}
exports.CommentService = CommentService;
