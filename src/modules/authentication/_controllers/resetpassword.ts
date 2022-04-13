import { RequestHandler } from "express";
import { AdminAccountModel } from "../../admin/model";
// utilities
import bcrypt from "bcryptjs";

// @function, handles user login and assigning of generated login tokens
export const resetPasswordController: RequestHandler = async (req, res, next) => {
	const newPassword = bcrypt.hashSync(req.body.newPassword, 12);
	await AdminAccountModel.findOneAndUpdate({ username: req.body.username }, { password: newPassword }, {returnOriginal: false});
	return res.status(200).json({ success: true})
};
