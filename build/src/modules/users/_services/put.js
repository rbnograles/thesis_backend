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
exports.putOneUserTypeService = exports.putOneService = void 0;
const model_1 = require("../model");
const errors_1 = require("../../../_utils/errors");
const isExistingDatabase_1 = require("../../../_utils/isExistingDatabase");
const putOneService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, isExistingDatabase_1.isExistingInDatabase)("_id", id, model_1.UserAccountModel, true)) {
        const currentAccount = yield model_1.UserAccountModel.findById(id);
        return yield model_1.UserAccountModel.findOneAndUpdate({ _id: id }, data, {
            returnOriginal: false,
        });
    }
    else {
        throw (0, errors_1.NotFoundError)("Admin account not found");
    }
});
exports.putOneService = putOneService;
const putOneUserTypeService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, isExistingDatabase_1.isExistingInDatabase)("_id", id, model_1.UserAccountModel, true)) {
        const currentAccount = yield model_1.UserAccountModel.findById(id);
        return yield model_1.UserAccountModel.findOneAndUpdate({ _id: id }, data, {
            returnOriginal: false,
        });
    }
    else {
        throw (0, errors_1.NotFoundError)("User account not found");
    }
});
exports.putOneUserTypeService = putOneUserTypeService;
