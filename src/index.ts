// dependencies imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";

// system modules
import { mainRouter } from "./routes";
import { clientResponse } from "./_utils/clientResponse";
import { connectToDatabase } from "./_utils/dbConnect";
import { build } from "joi";

// server configuration start up
dotenv.config();
const server = express();

const port = process.env.PORT || 5000;

server.use(
	cors({
		origin: "*",
	})
);

server.use(morgan("combined"));
server.use(express.json({ limit: "50mb" }));
server.use("/api", mainRouter);
server.use(clientResponse);

// check if in production
if (process.env.NODE_ENV === "production") {
	server.use(express.static("../client/build"));
	server.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

// server start boot logs
const startServer = async (): Promise<void> => {
	console.clear();
	console.log("JuanBreath: COVID-19 Contact Tracing Server\n");

	if (await connectToDatabase()) {
		server.listen(port, () => {
			console.log(
				`Now running and listening at \x1b[32m${
					process.env.NODE_ENV === "development"
						? "localhost:"
						: "SERVER-IP"
				}${port}`,
				"\x1b[0m"
			);
			console.log("Server logging starts now.");
		});
	}
};

// server call
startServer();
