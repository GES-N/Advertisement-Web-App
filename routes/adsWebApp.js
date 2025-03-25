import { Router } from "express";

import {
  addAdvert,
  deleteAdvert,
  getAdvertById,
  getAllAdverts,
  updateAdvert
} from "../controllers/adsWebApp.js";
import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";
import { adsImageUpload } from "../middlewares/upload.js";

export const adsRouter = Router();

//add ads
adsRouter.post(
  "/ads",
  isAuthenticated,
  isAuthorized(["vendor"]),
  // productImageUpload.single('image'),
  adsImageUpload.array("images", 3),
  addAdvert
);

//get all ads
adsRouter.get("/ads", getAllAdverts);

//get an ad
adsRouter.get("/ads/:id", getAdvertById);

//update an ad
adsRouter.patch("/ads/:id", isAuthenticated, isAuthorized(["vendor"]), updateAdvert);

//incase of attempting a put rather than a patch
// adsRouter.put(
//     '/products/:id',
//     isAuthenticated, 
//     productImageUpload.array('pictures', 3),
//     updateAdvert);

//delete an ad
adsRouter.delete("/ads/:id", isAuthenticated, deleteAdvert);

export default adsRouter;

