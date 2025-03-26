import { Router } from "express";
import { uploadLogo } from "../middlewares/upload.js";

import { loginUser, registerUser, updateUser } from "../controllers/userAdsWebApp.js";

import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";

const userRouter = Router()

//register user
userRouter.post('/user/register',  uploadLogo.single("uploadLogo"), registerUser);

//login user
userRouter.post('/user/login', loginUser);

//update user
// userRouter.put('/user/:id', updateUser);

//update user
userRouter.put('/user/:id', 
    isAuthenticated,
    isAuthorized(['vendor', 'admin']),
    updateUser);

export default userRouter;