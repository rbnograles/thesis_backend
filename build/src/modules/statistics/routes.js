"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const counter_1 = require("./_controllers/counter");
const checkAccess_1 = require("../../middlewares/checkAccess");
exports.router = (0, express_1.Router)();
exports.router
    .route("/all")
    .get((0, checkAccess_1.checkAccess)(["Statistics:Read"]), counter_1.appStatisticsController);
exports.default = exports.router;
