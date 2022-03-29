import initMB from "messagebird";
import dotenv from "dotenv";

// set up to message bird configuration
dotenv.config();
const accessKey = process.env.messageBirdTestKey

export const messagebird = initMB(accessKey)

