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
exports.createManyService = exports.createOneServiceSeed = exports.createOneService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errors_1 = require("../../../_utils/errors");
const isExistingDatabase_1 = require("../../../_utils/isExistingDatabase");
const model_1 = require("../model");
const nodemailer_1 = __importDefault(require("nodemailer"));
const createOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, isExistingDatabase_1.isExistingInDatabase)("username", data.username, model_1.AdminAccountModel))
        throw (0, errors_1.ExistingError)("Administrator");
    data.password = bcryptjs_1.default.hashSync("juanbreath_admin", 12);
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
        to: data.email,
        from: "JuanBreath Admin <juanbreath.official@gmail.com>",
        envelope: {
            from: "JuanBreath Admin <juanbreath.official@gmail.com>",
            to: data.email
        },
        subject: `Account and password setup`,
        html: `<p>Welcome ${data.username}, your password is, </p><p>juanbreath_admin</p><p>Please change this as soon as you logged in.</p>`,
    };
    transporter
        .sendMail(message).then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });
    const result = yield model_1.AdminAccountModel.create(data);
    return result;
});
exports.createOneService = createOneService;
const createOneServiceSeed = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, isExistingDatabase_1.isExistingInDatabase)("username", data.username, model_1.AdminAccountModel))
        throw (0, errors_1.ExistingError)("Administrator");
    data.password = bcryptjs_1.default.hashSync("juanbreath_admin", 12);
    const result = yield model_1.AdminAccountModel.create(data);
    return result;
});
exports.createOneServiceSeed = createOneServiceSeed;
const createManyService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    let accounts = [];
    for (let i = 0; i < data.length; i++) {
        data[i].password = bcryptjs_1.default.hashSync(data[i].password, 12);
        accounts.push(data[i]);
    }
    return yield model_1.AdminAccountModel.insertMany(accounts);
});
exports.createManyService = createManyService;
