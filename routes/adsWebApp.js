import { Router } from "express";

import {
  addAdvert,
  delAdvert,
  deleteAdvert,
  getAdvert,
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
  isAuthorized(["vendor", "admin"]),
  adsImageUpload.array("images", 3),
  addAdvert
);

//get all adverts
adsRouter.get("/ads", getAllAdverts);

//get a single advert
adsRouter.get("/ad/:id", getAdvert);

//get adverts for a particular vendor
adsRouter.get("/ad",  isAuthenticated, getAdvertById);

//update an advert
adsRouter.patch(
  "/ad/:id",
  isAuthenticated,
  isAuthorized(["vendor", "admin"]),
  updateAdvert
);

//delete a single advert
adsRouter.delete("/ad/:id", isAuthenticated, isAuthorized(["vendor"]), delAdvert)



//delete an advert related to a vendor
adsRouter.delete("/ad/:id", 
  isAuthenticated, 
   isAuthorized(["vendor", "admin"]),
    deleteAdvert);

export default adsRouter;
