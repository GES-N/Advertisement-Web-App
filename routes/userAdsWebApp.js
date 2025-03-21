import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userAdsWebController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/userAuth.js";

const userRouter = Router()

//register user
userRouter.post('/user/register', registerUser);

//login user
userRouter.get('/user/login', loginUser);

// //update user
// userRouter.put('/user/:id', 
//     isAuthenticated,
//     isAuthorized(['superadmin', 'admin']),
//     updateUser);

export default  userRouter;