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
exports.getManyController = exports.getOneRoleExclusiveController = exports.getOneController = void 0;
const get_1 = require("../_services/get");
const getOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, get_1.getOneService)(req.params.id);
        res.status(201).json({ success: true, data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.getOneController = getOneController;
const getOneRoleExclusiveController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, get_1.getOneRoleExclusiveService)(req.params.rolename);
        console.log(data);
        res.status(201).json({ success: true, data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.getOneRoleExclusiveController = getOneRoleExclusiveController;
const getManyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, get_1.getManyService)();
        res.status(201).json({ success: true, data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.getManyController = getManyController;
