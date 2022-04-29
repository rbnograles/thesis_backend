"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientResponse = void 0;
const clientResponse = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message,
    });
    next();
};
exports.clientResponse = clientResponse;
