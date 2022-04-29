"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const create_1 = require("./_controller/create");
exports.router = (0, express_1.Router)();
exports.router.route("/send").post(create_1.createOneController);
exports.router.route("/otp-verify").post(create_1.verifyOneController);
