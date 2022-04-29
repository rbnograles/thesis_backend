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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordController = void 0;
const model_1 = require("../../admin/model");
const nodemailer_1 = __importDefault(require("nodemailer"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const forgotPasswordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let password;
    password = Math.random().toString(36);
    const resetedPassword = bcryptjs_1.default.hashSync(password, 12);
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "juanbreath.official@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.AUTH_REFRESH_TOKEN
        }
    });
    transporter.verify((err, success) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Ready for message");
            console.log(success);
        }
    });
    const message = {
        to: req.body.email,
        from: "JuanBreath Admin <juanbreath.official@gmail.com>",
        envelope: {
            from: "JuanBreath Admin <juanbreath.official@gmail.com>",
            to: req.body.email
        },
        subject: `Forgot Password Request`,
        html: `<p>Greetings, a password reset request has been sent to the system. An auto generated password is created for your ease.</p><p>Your new password is,</p><p><b>${password}</b></p><p>Kindly change this upon logging in to the system.</p><p>Please feel free to respond to this email. It was sent from a monitored email address, and we would love to hear from you.</p>`,
    };
    transporter
        .sendMail(message).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
    yield model_1.AdminAccountModel.findOneAndUpdate({ email: req.body.email }, { password: resetedPassword }, { returnOriginal: false });
    return res.status(200).json({ success: true });
});
exports.forgotPasswordController = forgotPasswordController;
