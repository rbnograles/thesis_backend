"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const get_1 = require("./_controllers/get");
exports.router = (0, express_1.Router)();
exports.router.route("/many").get(get_1.getManyController);
exports.router.route("/:id").get(get_1.getOneController);
exports.default = exports.router;
