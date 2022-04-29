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
exports.isManyExistingInDatabase = exports.isExistingInDatabase = void 0;
const errors_1 = require("../_utils/errors");
const isExistingInDatabase = (field, valueToMatch, model, noError) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield model.findOne({ [field]: valueToMatch });
    if (matches) {
        if (!noError) {
            throw (0, errors_1.ExistingError)(field);
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
});
exports.isExistingInDatabase = isExistingInDatabase;
const isManyExistingInDatabase = (model, fieldToCompare) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const duplicates = [];
        const existingData = yield model.find({
            [fieldToCompare]: { $in: req.body[fieldToCompare] },
        });
        existingData.forEach((element) => {
            duplicates.push(element[fieldToCompare]);
        });
        if (existingData.length > 0)
            return res.status(400).json({
                success: false,
                message: `${fieldToCompare} already exist in the database`,
                duplicates: duplicates,
            });
        delete req.body[fieldToCompare];
        next();
    });
};
exports.isManyExistingInDatabase = isManyExistingInDatabase;
