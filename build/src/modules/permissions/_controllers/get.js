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
exports.getOneController = exports.getManyController = void 0;
const get_1 = __importDefault(require("../_services/get"));
const permissionService = new get_1.default();
const getManyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield permissionService.getAllPermissions();
    if (!result.success) {
        return res.status(result.code).send(result);
    }
    res.status(200).send(result);
});
exports.getManyController = getManyController;
const getOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    let result = yield permissionService.getOnePermissions(_id);
    if (!result.success) {
        return res.status(result.code).send(result);
    }
    res.status(200).send(result);
});
exports.getOneController = getOneController;
