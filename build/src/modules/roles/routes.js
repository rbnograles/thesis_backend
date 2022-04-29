"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const get_1 = require("./_controllers/get");
const checkAccess_1 = require("../../middlewares/checkAccess");
const create_1 = require("./_controllers/create");
const put_1 = require("./_controllers/put");
const delete_1 = require("./_controllers/delete");
const requestValidator_1 = require("../../middlewares/requestValidator");
const schema_1 = require("./schema");
exports.router = (0, express_1.Router)();
exports.router
    .route("/many")
    .get((0, checkAccess_1.checkAccess)(["Role:Read"]), get_1.getManyController)
    .delete((0, checkAccess_1.checkAccess)(["Role:Read", "Role:Delete"]), (0, requestValidator_1.validateArrayOfIds)(schema_1.roleIdArraySchema), delete_1.deleteManyController);
exports.router
    .route("/:rolename")
    .get(get_1.getOneRoleExclusiveController);
exports.router
    .route("/:id")
    .get((0, checkAccess_1.checkAccess)(["Role:Read"]), get_1.getOneController)
    .delete((0, checkAccess_1.checkAccess)(["Role:Read", "Role:Delete"]), delete_1.deleteOneController)
    .put((0, checkAccess_1.checkAccess)(["Role:Read", "Role:Update"]), (0, requestValidator_1.validateRequest)(schema_1.rolesSchema), put_1.putOneController);
exports.router
    .route("/")
    .post((0, checkAccess_1.checkAccess)(["Role:Read", "Role:Create"]), (0, requestValidator_1.validateRequest)(schema_1.rolesSchema), create_1.createOneController);
exports.default = exports.router;
