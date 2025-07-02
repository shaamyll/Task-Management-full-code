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
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const validationMiddleware = (type, value = 'body') => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = yield (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(type, req[value]), { skipMissingProperties: false });
        console.log(errors);
        if (errors.length > 0) {
            const message = errors.map((error) => Object.values(error.constraints)).join((', '));
            res.status(400).json(message);
        }
        else {
            next();
        }
    });
};
exports.default = validationMiddleware;
