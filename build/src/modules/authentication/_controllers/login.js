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
exports.loginController = exports.validateForgotPasswordCredentials = exports.validateResetPasswordCredentials = exports.validateCredentials = void 0;
const schema_1 = require("../schema");
const model_1 = require("../../admin/model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const tokenGenerator_1 = require("../../../_utils/tokenGenerator");
const requestValidatorConfig_1 = require("../../../_utils/requestValidatorConfig");
const errors_1 = require("../../../_utils/errors");
const validateCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(schema_1.LoginSchema, req.body);
        const { username } = req.body;
        model_1.AdminAccountModel.findOne({ username })
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                const match = yield bcryptjs_1.default.compare(req.body.password, user.password);
                if (!match)
                    throw (0, errors_1.AuthenticationError)("Wrong password.");
                next();
            }
            else {
                throw (0, errors_1.AuthenticationError)("There is no registered user that matches your credentials.");
            }
        }))
            .catch(next);
    }
    catch (error) {
        next(error);
    }
});
exports.validateCredentials = validateCredentials;
const validateResetPasswordCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(schema_1.ResetPasswordSchema, req.body);
        const { username } = req.body;
        model_1.AdminAccountModel.findOne({ username })
            .then((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user) {
                const match = yield bcryptjs_1.default.compare(req.body.password, user.password);
                if (!match)
                    throw (0, errors_1.AuthenticationError)("Wrong password.");
                next();
            }
            else {
                throw (0, errors_1.AuthenticationError)("There is no registered user that matches your credentials.");
            }
        }))
            .catch(next);
    }
    catch (error) {
        next(error);
    }
});
exports.validateResetPasswordCredentials = validateResetPasswordCredentials;
const validateForgotPasswordCredentials = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, requestValidatorConfig_1.validateRequestSchema)(schema_1.ForgotPasswordSchema, req.body);
        const user = yield model_1.AdminAccountModel.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            next();
        }
        else {
            throw (0, errors_1.AuthenticationError)("There is no registered user that matches your credentials.");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.validateForgotPasswordCredentials = validateForgotPasswordCredentials;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    model_1.AdminAccountModel.findOne({
        username: req.body.username,
    }).then((user) => {
        const tokenizedObj = {
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            username: user.username,
            role: user.role,
        };
        const accessToken = (0, tokenGenerator_1.generateToken)(tokenizedObj, req.body.role, "accessToken");
        const refreshToken = (0, tokenGenerator_1.generateToken)(tokenizedObj, req.body.role, "refreshToken");
        res.status(200).json({ success: true, accessToken, refreshToken });
    });
});
exports.loginController = loginController;
