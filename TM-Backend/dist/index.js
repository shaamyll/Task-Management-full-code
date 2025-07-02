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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const DB_1 = __importDefault(require("./config/DB"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
const socket_1 = require("./socket/socket");
const TMserver = (0, express_1.default)();
TMserver.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
TMserver.use(express_1.default.json());
TMserver.use(express_1.default.urlencoded({ extended: true }));
const routes = [new auth_routes_1.default(), new task_routes_1.default(), new comment_routes_1.default()];
routes.forEach(route => TMserver.use('/api', route.router));
const PORT = process.env.PORT || 3000;
DB_1.default.authenticate().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield DB_1.default.sync();
    const httpServer = (0, socket_1.createSocketServer)(TMserver); // Socket starts AFTER Express is ready
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}));
