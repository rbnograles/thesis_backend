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
exports.createOneService = void 0;
const model_1 = require("..//model");
const createOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield model_1.MobileOTPModel.findOne({ mobileNumber: data.mobileNumber })) {
        const result = yield model_1.MobileOTPModel.findOneAndUpdate({ mobileNumber: data.mobileNumber }, data, {
            returnOriginal: false,
        });
        return result;
    }
    else {
        const result = yield model_1.MobileOTPModel.create(data);
        return result;
    }
});
exports.createOneService = createOneService;
