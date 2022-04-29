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
exports.createManyController = exports.createOneController = void 0;
const create_1 = require("../_services/create");
const createOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, create_1.createOneService)(req.body);
        res.status(201).json({ success: true, data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.createOneController = createOneController;
const createManyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.admins.length === 0) {
            return res.status(400).json({
                success: false,
                message: "There are no accounts to be created.",
            });
        }
        const data = yield (0, create_1.createManyService)(req.body.admins);
        res.status(201).json({ success: true, data: data });
    }
    catch (err) {
        next(err);
    }
});
exports.createManyController = createManyController;
