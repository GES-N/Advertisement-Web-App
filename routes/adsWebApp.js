import { Router } from "express";

import {
  addAdvert,
  deleteAdvert,
  getAdvertById,
  getAllAdverts,
  updateAdvert,
} from "../controllers/adsWebApp.js";
import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";
import { adsImageUpload } from "../middlewares/upload.js";

export const adsRouter = Router();

//add advert
adsRouter.post(
  "/ads",
  isAuthenticated,
  isAuthorized(["vendor"]),
  adsImageUpload.array("images", 3),
  addAdvert
);

//get all adverts
adsRouter.get("/ads", getAllAdverts);

//get an advert
adsRouter.get("/ads/:id", getAdvertById);

//update an advert
adsRouter.patch(
  "/ads/:id",
  isAuthenticated,
  isAuthorized(["vendor"]),
  updateAdvert
);

//delete an advert
adsRouter.delete("/ads/:id", isAuthenticated, deleteAdvert);

export default adsRouter;
