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
exports.getManyService = exports.getOneVisitationHistoryService = exports.getOneCloseContactServices = exports.getOneService = void 0;
const model_1 = require("../model");
const model_2 = require("../../users/model");
const model_3 = require("../../visitation-history/model");
const getOneService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.PositiveLogsModel.findById(id);
    return result;
});
exports.getOneService = getOneService;
const getOneCloseContactServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let visitedLocation = [];
    let closeContactsVisitations = [];
    const userInfo = yield model_2.UserAccountModel.find({ mobileNumber: id });
    const userVisitationInfo = yield model_3.VisitationHistoryModel.find({
        userId: userInfo[0]._id,
    });
    for (let i = 0; i < userVisitationInfo.length; i++) {
        visitedLocation.push({
            location: userVisitationInfo[i].location,
            date: userVisitationInfo[i].date,
            time: userVisitationInfo[i].time,
        });
    }
    visitedLocation = visitedLocation.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
    console.log(visitedLocation);
    for (let y = 0; y < visitedLocation.length; y++) {
        const closeContacts = yield model_3.VisitationHistoryModel.find({
            location: visitedLocation[y].location,
            date: visitedLocation[y].date,
        }).populate("userId");
        closeContactsVisitations.push(...closeContacts);
    }
    return closeContactsVisitations;
});
exports.getOneCloseContactServices = getOneCloseContactServices;
const getOneVisitationHistoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = yield model_2.UserAccountModel.find({ mobileNumber: id });
    const userVisitationInfo = yield model_3.VisitationHistoryModel.find({
        userId: userInfo[0]._id,
    });
    return userVisitationInfo;
});
exports.getOneVisitationHistoryService = getOneVisitationHistoryService;
const getManyService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.PositiveLogsModel.find();
});
exports.getManyService = getManyService;
