"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const auth_dto_1 = require("../dtos/auth.dto");
const authentication_middleware_1 = __importDefault(require("../middlewares/authentication.middleware"));
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.path = '/auth';
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(auth_dto_1.SignUpDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(auth_dto_1.LoginDTO, 'body'), this.authController.login);
        //Create user
        this.router.post(`/createUser`, (0, validation_middleware_1.default)(auth_dto_1.SignUpDto, 'body'), authentication_middleware_1.default, this.authController.createUser);
        //fetch all Users
        this.router.get(`/allUsers`, authentication_middleware_1.default, this.authController.fetchAllUsers);
        this.router.delete(`/deleteUser/:id`, authentication_middleware_1.default, this.authController.deleteUser);
        //Edti user
        this.router.put(`/updateUser/:id`, (0, validation_middleware_1.default)(auth_dto_1.SignUpDto, 'body'), authentication_middleware_1.default, this.authController.updateUser);
    }
}
exports.default = AuthRoutes;
