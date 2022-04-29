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
const model_1 = require("../model");
class PermissionService {
    constructor() { }
    getAllPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = yield model_1.PermissionModel.find({}, { name: 1, description: 1 });
                if (permissions.length === 0)
                    return {
                        success: true,
                        message: "No Permissions existing",
                        code: 200,
                    };
                return { success: true, data: permissions, code: 200 };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to GET All Permissions",
                    deepLog: error,
                    code: 400,
                };
            }
        });
    }
    getOnePermissions(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let isExisting = yield model_1.PermissionModel.findById({ _id });
            if (isExisting === null)
                return {
                    success: false,
                    message: "Permission does not exist",
                    code: 400,
                };
            try {
                let getPermission = yield model_1.PermissionModel.findById({ _id }, { name: 1, description: 1 });
                return { success: true, data: getPermission, code: 200 };
            }
            catch (error) {
                return {
                    success: false,
                    message: "Failed to GET Permission",
                    deepLog: error,
                    code: 400,
                };
            }
        });
    }
}
exports.default = PermissionService;
