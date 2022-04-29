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
const schema_1 = require("../../modules/locations/schema");
const isManyExistingInDatabase_1 = require("../../middlewares/isManyExistingInDatabase");
const models_1 = require("./models");
exports.router = (0, express_1.Router)();
exports.router
    .route("/many")
    .get((0, checkAccess_1.checkAccess)(["Location:Read"]), get_1.getManyController)
    .delete((0, checkAccess_1.checkAccess)(["Location:Read", "Location:Delete"]), (0, requestValidator_1.validateArrayOfIds)(schema_1.locationIdArraySchema), delete_1.deleteManyController)
    .post((0, checkAccess_1.checkAccess)(["Location:Read", "Location:Create"]), (0, requestValidator_1.validateMany)(schema_1.locationSchema, "locations"), (0, checkForDuplicates_1.checkDuplicates)("locations", "name"), (0, isManyExistingInDatabase_1.isManyExistingInDatabase)(models_1.LocationModel, "name"), create_1.createManyController);
exports.router
    .route("/:id")
    .get((0, checkAccess_1.checkAccess)(["Location:Read"]), get_1.getOneController)
    .put((0, checkAccess_1.checkAccess)(["Location:Read", "Location:Update"]), (0, requestValidator_1.validateRequest)(schema_1.locationSchema), put_1.putOneController)
    .delete(delete_1.deleteOneController);
exports.router
    .route("/")
    .post((0, checkAccess_1.checkAccess)(["Location:Read", "Location:Create"]), (0, requestValidator_1.validateRequest)(schema_1.locationSchema), create_1.createOneController);
exports.default = exports.router;
