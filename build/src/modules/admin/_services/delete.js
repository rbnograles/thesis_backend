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
exports.deleteManyService = exports.deleteOneService = void 0;
const model_1 = require("../model");
const deleteOneService = (idToDelete) => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.AdminAccountModel.findByIdAndDelete(idToDelete);
    return true;
});
exports.deleteOneService = deleteOneService;
const deleteManyService = (idsToBeDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < idsToBeDeleted.length; i++) {
        (0, exports.deleteOneService)(idsToBeDeleted[i]);
    }
    return true;
});
exports.deleteManyService = deleteManyService;
