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
exports.checkAccess = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const permissions_1 = require("../modules/permissions");
const model_1 = require("../modules/roles/model");
const checkAccess = (scopes) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization.split(" ")[1];
        let userRole;
        jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET || "hello world", (err, decoded) => {
            userRole = decoded === null || decoded === void 0 ? void 0 : decoded.role;
        });
        const permissionNames = [];
        const roles = yield model_1.RoleModel.findOne({ name: userRole });
        const permissions = yield permissions_1.PermissionModel.find({
            _id: { $in: [...roles.permissions] },
        });
        for (let i in permissions) {
            permissionNames.push(permissions[i].name);
        }
        let found = true;
        for (let i in scopes) {
            if (!permissionNames.includes(scopes[i])) {
                found = false;
                res.status(403).send({
                    success: false,
                    message: "You do not have a permission for this module",
                });
                break;
            }
        }
        found && next();
    });
};
exports.checkAccess = checkAccess;
