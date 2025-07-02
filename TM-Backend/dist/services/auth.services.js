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
const sequelize_1 = require("sequelize");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthServices {
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: data.email } });
            if (user) {
                throw { status: 409, message: "User already exists" };
            }
            const newUser = yield User_1.User.create({
                email: data.email,
                username: data.username,
                password: data.password,
                role: "user"
            });
            console.log(newUser);
            return newUser;
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: data.email } });
            if (!user) {
                throw { status: 404, message: "User not exists" };
            }
            if (user.password !== data.password) {
                throw { status: 401, message: "Invalid Password" };
            }
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            };
            const token = yield jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
            return { user: payload, token: `Bearer ${token}` };
        });
    }
    fetchAllUsers(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (filters.searchName) {
                where.username = { [sequelize_1.Op.iLike]: `%${filters.searchName}%` };
            }
            if (filters.searchEmail) {
                where.email = { [sequelize_1.Op.iLike]: `%${filters.searchEmail}%` };
            }
            if (filters.role) {
                where.role = filters.role;
            }
            console.log("📦 Final WHERE clause:", where);
            return yield User_1.User.findAll({
                where,
                order: [['createdAt', 'DESC']],
            });
        });
    }
    //Delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { id } });
            if (!user) {
                throw { status: 404, message: "User not found" };
            }
            const deleteUser = yield User_1.User.destroy({ where: { id } });
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email: data.email } });
            if (user) {
                throw { status: 409, message: "User already exists" };
            }
            const newUser = yield User_1.User.create({
                email: data.email,
                username: data.username,
                password: data.password,
                role: data.role || "user"
            });
            console.log(newUser);
            return newUser;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield User_1.User.update(data, {
                where: {
                    id
                },
                returning: true
            });
            return updatedUser;
        });
    }
}
exports.default = AuthServices;
