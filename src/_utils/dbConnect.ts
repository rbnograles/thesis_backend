import mongoose from "mongoose";

const mongooseConnector = async (mongodbUri: string) => {
	let connected = false;

	const databaseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	};

	while (!connected) {
		await mongoose
			.connect(mongodbUri, databaseOptions)
			.then(() => {
				connected = true;
				console.log("Successfully connected to the database.\n\n");
			})
			.catch((err) => {
				console.log(err);
				console.error(
					"We have a problem connecting to the database, retrying..."
				);
			});
	}

	return mongoose.connection.readyState > 0;
};

/**
 * Connects to the database.
 * @returns Boolean
 */
export const connectToDatabase = async (): Promise<boolean> => {
	const { DB_HOST, DB_PORT, DB_NAME } = process.env;

	if (!DB_HOST || !DB_NAME) {
		console.log(DB_HOST, DB_PORT, DB_NAME);
		throw new Error(
			"You have not defined the database credentials correctly."
		);
	}

	console.log(
		`Connecting to the MongoDB database at: ${process.env.MONGO_DB_URI}`
	);

	return await mongooseConnector(process.env.MONGO_DB_URI);
};
