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
exports.getManyService = exports.getOneRoleExclusiveService = exports.getOneService = void 0;
const model_1 = require("../model");
const getOneService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.RoleModel.findById(id);
    return result;
});
exports.getOneService = getOneService;
const getOneRoleExclusiveService = (roleName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.RoleModel.find({ name: roleName }).populate("permissions");
    return result;
});
exports.getOneRoleExclusiveService = getOneRoleExclusiveService;
const getManyService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.RoleModel.find().populate("permissions");
});
exports.getManyService = getManyService;
