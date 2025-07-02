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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers["authorization"];
        if (token) {
            try {
                const authToken = token.split("Bearer ")[1];
                const verified = jsonwebtoken_1.default.verify(authToken, process.env.JWT_KEY);
                const user = yield User_1.User.findOne({
                    where: {
                        id: verified.id
                    }
                });
                if (!user) {
                    res.status(401).json({ message: "User not found" });
                }
                req.user = verified;
                next();
            }
            catch (err) {
                res.status(401).json({ messsage: "Wrong authentication token" });
            }
        }
        else {
            res.status(401).json({ messsage: "Token is missing" });
        }
    });
}
exports.default = authMiddleware;
