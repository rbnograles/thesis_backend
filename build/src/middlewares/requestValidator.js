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
exports.validateArrayOfIds = exports.validateMany = exports.validateRequest = void 0;
const joi_1 = __importDefault(require("joi"));
const requestValidatorConfig_1 = require("../_utils/requestValidatorConfig");
const validateRequest = (schema) => (req, res, next) => {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(schema, req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateRequest = validateRequest;
const validateMany = (schema, key) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(joi_1.default.array().items(schema), req.body[key]);
    }
    catch (err) {
        next(err);
    }
    next();
});
exports.validateMany = validateMany;
const validateArrayOfIds = (schema) => (req, res, next) => {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(schema, req.body.idsToBeDeleted);
        next();
    }
    catch (error) {
        next(error);
    }
    next();
};
exports.validateArrayOfIds = validateArrayOfIds;
