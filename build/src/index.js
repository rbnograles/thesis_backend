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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const clientResponse_1 = require("./_utils/clientResponse");
const dbConnect_1 = require("./_utils/dbConnect");
dotenv_1.default.config();
const server = (0, express_1.default)();
const port = process.env.PORT || 5000;
server.use((0, cors_1.default)({
    origin: "*",
}));
server.use((0, morgan_1.default)("combined"));
server.use(express_1.default.json({ limit: "50mb" }));
server.get("/api/app/download", (req, res) => {
    res.download(`${__dirname + "/JuanBreath.apk"}`);
});
server.use("/api", routes_1.mainRouter);
server.use(clientResponse_1.clientResponse);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("JuanBreath: COVID-19 Contact Tracing Server\n");
    if (yield (0, dbConnect_1.connectToDatabase)()) {
        server.listen(port, () => {
            console.log(`Now running and listening at \x1b[32m${process.env.NODE_ENV === "development"
                ? "localhost:"
                : "SERVER-IP"}${port}`, "\x1b[0m");
            console.log("Server logging starts now.");
        });
    }
});
startServer();
