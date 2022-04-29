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
exports.putOneUserTypeController = exports.putOneController = void 0;
const put_1 = require("../_services/put");
const putOneController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, put_1.putOneService)(req.params.id, req.body)
        .then((data) => {
        res.status(201).json({ success: true, data });
    })
        .catch(next);
});
exports.putOneController = putOneController;
const putOneUserTypeController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, put_1.putOneUserTypeService)(req.params.id, req.body)
        .then((data) => {
        res.status(201).json({ success: true, data });
    })
        .catch(next);
});
exports.putOneUserTypeController = putOneUserTypeController;
