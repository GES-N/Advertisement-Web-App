import { Router } from "express";
import {
  addAdvert,
  deleteAdvert,
  getAdvert,
  getAllAdverts,
  updateAdvert,
} from "../controllers/adsWebApp.js";
import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";
import { adsImageUpload } from "../middlewares/upload.js";

export const adsRouter = Router();

//add ads
adsRouter.post(
  "/ads",
  isAuthenticated,
  isAuthorized(["superadmin", "admin"]),
  // productImageUpload.single('image'),
  adsImageUpload.array("pictures", 3),
  addAdvert
);

//get all ads
adsRouter.get("/ads", getAllAdverts);

//get an ad
adsRouter.get("/ads/:id", getAdvert);

//update an ad
adsRouter.patch("/ads/:id", isAuthenticated, updateAdvert);

//incase of attempting a put rather than a patch
// adsRouter.put(
//     '/products/:id',
//     isAuthenticated,
//     productImageUpload.array('pictures', 3),
//     updateAdvert);

//delete an ad
adsRouter.patch("/ads/:id", isAuthenticated, deleteAdvert);

export default adsRouter;
