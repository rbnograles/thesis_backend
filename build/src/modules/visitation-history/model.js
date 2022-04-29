"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitationHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const VisitationHistorySchema = new mongoose_1.Schema({
    location: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
});
exports.VisitationHistoryModel = (0, mongoose_1.model)("visitation-history", VisitationHistorySchema);
