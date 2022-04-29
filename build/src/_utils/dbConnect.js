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
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseConnector = (mongodbUri) => __awaiter(void 0, void 0, void 0, function* () {
    let connected = false;
    const databaseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    };
    while (!connected) {
        yield mongoose_1.default
            .connect(mongodbUri, databaseOptions)
            .then(() => {
            connected = true;
            console.log("Successfully connected to the database.\n\n");
        })
            .catch((err) => {
            console.log(err);
            console.error("We have a problem connecting to the database, retrying...");
        });
    }
    return mongoose_1.default.connection.readyState > 0;
});
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    if (!DB_HOST || !DB_NAME) {
        console.log(DB_HOST, DB_PORT, DB_NAME);
        throw new Error("You have not defined the database credentials correctly.");
    }
    const mongodbUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    console.log(`Connecting to the MongoDB database at: mongodb://${DB_HOST}:${DB_PORT}`);
    return yield mongooseConnector(process.env.NODE_ENV === "production"
        ? process.env.MONGO_DB_URI
        : mongodbUri);
});
exports.connectToDatabase = connectToDatabase;
