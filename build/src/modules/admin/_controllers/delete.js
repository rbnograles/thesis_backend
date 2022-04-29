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
exports.deleteManyController = exports.deleteOneController = void 0;
const delete_1 = require("../_services/delete");
const deleteOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, delete_1.deleteOneService)(req.params.id);
        res.status(201).json({ success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteOneController = deleteOneController;
const deleteManyController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, delete_1.deleteManyService)(req.body.idsToBeDeleted);
        res.status(201).send({ success: true });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteManyController = deleteManyController;
