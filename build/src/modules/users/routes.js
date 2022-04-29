"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const get_1 = require("./_controllers/get");
const put_1 = require("./_controllers/put");
const checkAccess_1 = require("../../middlewares/checkAccess");
exports.router = (0, express_1.Router)();
exports.router.route("/many").get((0, checkAccess_1.checkAccess)(["Users:Read"]), get_1.getManyController);
exports.router
    .route("/:id")
    .put(put_1.putOneUserTypeController)
    .get((0, checkAccess_1.checkAccess)(["Users:Read"]), get_1.getOneController);
exports.default = exports.router;
