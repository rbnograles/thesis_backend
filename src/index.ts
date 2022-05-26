// dependencies imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

// system modules
import { mainRouter } from "./routes";
import { clientResponse } from "./_utils/clientResponse";
import { connectToDatabase } from "./_utils/dbConnect";

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

// quick download method
server.get("/api/app/download", (req, res) => {
	res.download(`${__dirname + "/JuanBreath.apk"}`)
});

server.get("/api/admin/app/download", (req, res) => {
	res.download(`${__dirname + "/JuanBreath Admin.apk"}`)
});

server.use("/api", mainRouter);

server.use(clientResponse);

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
