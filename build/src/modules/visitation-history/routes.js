"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const create_1 = require("./_controllers/create");
const get_1 = require("./_controllers/get");
const checkAccess_1 = require("../../middlewares/checkAccess");
const requestValidator_1 = require("../../middlewares/requestValidator");
const schema_1 = require("./schema");
exports.router = (0, express_1.Router)();
exports.router.route("/many").get((0, checkAccess_1.checkAccess)(["Admin:Read"]), get_1.getManyController);
exports.router.route("/:id").get((0, checkAccess_1.checkAccess)(["Admin:Read"]), get_1.getOneController);
exports.router
    .route("/")
    .post((0, requestValidator_1.validateRequest)(schema_1.visitationHistorySchema), create_1.createOneController);
exports.default = exports.router;
