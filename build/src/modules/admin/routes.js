"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const get_1 = require("./_controllers/get");
const create_1 = require("./_controllers/create");
const put_1 = require("./_controllers/put");
const delete_1 = require("./_controllers/delete");
const requestValidator_1 = require("../../middlewares/requestValidator");
const checkAccess_1 = require("../../middlewares/checkAccess");
const checkForDuplicates_1 = require("../../middlewares/checkForDuplicates");
const schema_1 = require("./schema");
const isManyExistingInDatabase_1 = require("../../middlewares/isManyExistingInDatabase");
const model_1 = require("./model");
exports.router = (0, express_1.Router)();
exports.router
    .route("/many")
    .get((0, checkAccess_1.checkAccess)(["Admin:Read"]), get_1.getManyController)
    .delete((0, checkAccess_1.checkAccess)(["Admin:Read", "Admin:Delete"]), (0, requestValidator_1.validateArrayOfIds)(schema_1.adminIdArraySchema), delete_1.deleteManyController)
    .post((0, checkAccess_1.checkAccess)(["Admin:Read", "Admin:Create"]), (0, requestValidator_1.validateMany)(schema_1.adminSchema, "admins"), (0, checkForDuplicates_1.checkDuplicates)("admins", "username"), (0, isManyExistingInDatabase_1.isManyExistingInDatabase)(model_1.AdminAccountModel, "username"), create_1.createManyController);
exports.router
    .route("/:id")
    .get(get_1.getOneController)
    .put((0, requestValidator_1.validateRequest)(schema_1.adminPutSchema), put_1.putOneController)
    .delete((0, checkAccess_1.checkAccess)(["Admin:Read", "Admin:Delete"]), delete_1.deleteOneController);
exports.router
    .route("/")
    .post((0, checkAccess_1.checkAccess)(["Admin:Read", "Admin:Create"]), (0, requestValidator_1.validateRequest)(schema_1.adminSchema), create_1.createOneController);
exports.default = exports.router;
