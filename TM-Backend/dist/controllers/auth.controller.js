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
const auth_services_1 = __importDefault(require("../services/auth.services"));
class AuthController {
    constructor() {
        this.authService = new auth_services_1.default();
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userData = req.body;
                const data = yield this.authService.signUp(userData);
                res.status(201).json({ message: "User Created Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userData = req.body;
                const data = yield this.authService.login(userData);
                res.status(201).json({ message: "Login Successfull", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        this.fetchAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { searchName = '', searchEmail = '', role = '' } = req.query;
                const data = yield this.authService.fetchAllUsers({ searchName, searchEmail, role });
                res.status(200).json({ message: "All users data fetched successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        //Deleet user
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const data = yield this.authService.deleteUser(req.params.id);
                res.status(201).json({ message: "User Deleted Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const userData = req.body;
                const data = yield this.authService.createUser(userData);
                res.status(201).json({ message: "User Created Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
        //Update user
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const updatedData = req.body;
                const data = yield this.authService.updateUser(req.params.id, updatedData);
                res.status(201).json({ message: "User Updated Successfully", data });
            }
            catch (err) {
                res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).json({ message: (_b = err.message) !== null && _b !== void 0 ? _b : "Something went wrong" });
            }
        });
    }
}
exports.default = AuthController;
