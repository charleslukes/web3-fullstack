import { Router } from "express";
import jetValidator from "jet-validator";

import User from "@src/models/User";
import userRoutes from "./user-routes";
import mintRoutes from "./mint-routes";
import Mint from "@src/models/Mint";

const apiRouter = Router(),
  validate = jetValidator();

// **** Setup user routes **** //
const userRouter = Router();

// Get all users
userRouter.get(userRoutes.paths.get, userRoutes.getAll);

// Add one user
userRouter.post(
  userRoutes.paths.add,
  validate(["user", User.instanceOf]),
  userRoutes.add
);

// Update one user
userRouter.put(
  userRoutes.paths.update,
  validate(["user", User.instanceOf]),
  userRoutes.update
);

// Delete one user
userRouter.delete(
  userRoutes.paths.delete,
  validate(["id", "number", "params"]),
  userRoutes.delete
);

// **** Setup mint routes **** //
const mintRouter = Router();

// Get all mints
mintRouter.get(mintRoutes.paths.get, mintRoutes.getAll);

// Add one mint
mintRouter.post(
  mintRoutes.paths.add,
  validate(["mint", Mint.instanceOf]),
  mintRoutes.add
);

// Delete one mint
mintRouter.delete(
  mintRoutes.paths.delete,
  validate(["id", "number", "params"]),
  mintRoutes.delete
);

// Add userRouter
apiRouter.use(userRoutes.paths.basePath, userRouter);
apiRouter.use(mintRoutes.paths.basePath, mintRouter);

// **** Export default **** //

export default apiRouter;
