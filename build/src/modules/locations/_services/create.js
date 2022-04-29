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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createManyService = exports.createOneService = void 0;
const errors_1 = require("../../../_utils/errors");
const isExistingDatabase_1 = require("../../../_utils/isExistingDatabase");
const models_1 = require("../models");
const createOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, isExistingDatabase_1.isExistingInDatabase)("name", data.name, models_1.LocationModel))
        throw (0, errors_1.ExistingError)("Location");
    const result = yield models_1.LocationModel.create(data);
    return result;
});
exports.createOneService = createOneService;
const createManyService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.LocationModel.insertMany(data);
});
exports.createManyService = createManyService;
