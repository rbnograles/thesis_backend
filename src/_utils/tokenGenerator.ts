import jwt from "jsonwebtoken";

type jwtPayload = {
	id: string;
	username?: string;
	type: "superadmin" | "sub-admin";
	role?: string;
};

type userSchema = {
	_id: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	username: string;
	role: string;
};

export const generateToken = (
	user: userSchema,
	userType: "superadmin" | "sub-admin",
	tokenType: "accessToken" | "refreshToken"
) => {
	// build user payload
	const payload: jwtPayload = {
		id: user._id,
		username: user.username,
		type: userType,
		role: user.role,
	};
	// generation of user login token will proceed here
	const token: string = generateJWT(tokenType, payload);

	return token;
};

// build the token based on the standard jwt configuration and type
// access | refresh token
function generateJWT(type: string, payload: jwtPayload) {
	const {
		JWT_ACCESS_SECRET,
		JWT_ACCESS_EXPIRATION,
		JWT_REFRESH_SECRET,
		JWT_REFRESH_EXPIRATION,
	} = process.env;

	let token: string;

	if (type === "accessToken") {
		token = `Bearer ${jwt.sign(
			payload,
			JWT_ACCESS_SECRET || "ACCESS_SECRET",
			{
				expiresIn:
					JWT_ACCESS_EXPIRATION ||
					(process.env.NODE_ENV === "development" ? "7d" : "1d"),
			}
		)}`;
	} else if (type === "refreshToken") {
		token = `Bearer ${jwt.sign(
			payload,
			JWT_REFRESH_SECRET || "REFRESH_SECRET",
			{
				expiresIn: JWT_REFRESH_EXPIRATION || "7d",
			}
		)}`;
	}

	return token;
}
