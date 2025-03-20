import { Router } from "express";
import {
  userProductCreate,
  userProductGetAll,
  userProductUpdateById,
  userProductDelete,
} from "./controllers/Controller.js";
import { isAuthenticated } from "../middlewares/userAuth.js";

const userRoute = Router();

productRouter.post(
  "/products",
  isAuthenticated,
  isAuthorized("superadmin", "admin"),
  userProductCreate
);

userRoute.get("/product", userProductGetAll);

userRoute.get("/product/:id", userProductById);

userRoute.put(
  "/product/:id",
  isAuthenticated,
  isAuthorized("superadmin", "admin"),
  userProductUpdateById
);

userRoute.delete("/product/:id", isAuthenticated, userProductDelete);
