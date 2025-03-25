import {expressjwt} from 'express-jwt';
import { userModel } from '../models/userModels.js';

//authentication
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ['HS256'],
});

//authorization
export const isAuthorized = (role) => {
    return async (req, res, next) => {
        const user = await userModel.findById(req.auth.id);
        console.log(user)
        if(role?.includes(user.role)) {
            next();
        }else {
            res.status(403).json({message: 'you are not authorized to access this resource'});
        }
    }
}


