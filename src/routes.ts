import { Router } from "express";
import { trimRequests, authenticateToken } from "./middlewares";

// custom routers
import { messageRouter } from "./modules/messages";
import { authRouter } from "./modules/authentication";
import { locationRouter } from "./modules/locations";
import { adminRouter } from "./modules/admin";
import { permissionRouter } from "./modules/permissions";
import { roleRouter } from "./modules/roles";
import { visitationHistoryRouter } from "./modules/visitation-history";
import { usersRouter } from "./modules/users";
import { positiveLogsRouter } from "./modules/positive-logs";
import { statisticsRouter } from "./modules/statistics";

export const mainRouter = Router();

// otp route
mainRouter.use("/messages", messageRouter);
mainRouter.use("/visitation-history", visitationHistoryRouter);
mainRouter.use("/public/users", usersRouter);
mainRouter.use("/public/positive-log", positiveLogsRouter);
// validators
mainRouter.use("/auth", authRouter);

// routes bellow this line will be subjected to token authentications
mainRouter.use(authenticateToken);
mainRouter.use(trimRequests);

// api parents
mainRouter.use("/positive-log", positiveLogsRouter);
mainRouter.use("/admin/visitation-history", visitationHistoryRouter);
mainRouter.use("/locations", locationRouter);
mainRouter.use("/admins", adminRouter);
mainRouter.use("/permissions", permissionRouter);
mainRouter.use("/roles", roleRouter);
mainRouter.use("/users", usersRouter);
mainRouter.use('/statistics', statisticsRouter);