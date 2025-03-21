import { UserModel } from "../models/userModels.js";
import { loginUserValidator, registerUserValidator } from "../validators/userAdsWebApp.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//validate user info
export const registerUser = async(req,res,next)=>{
    const {error,value}=registerUserValidator.validate(req.body);
    if (error){
        return res.status(422).json(error)
    }

//check if user exists
const user = UserModel.findOne({
    $or:[
        {username: value.username},
        {email: value.email}
    ]
});

if(user){
    return res.status(409).json('User already exist!');
}
//Hash plaintext password
const hashedPassword = bcrypt.hashSync(value.password,10);

//create the new user
await UserModel.create({
    ...value,
    password: hashedPassword,
})

//return response
res.status(200).json('User created successfully');
}  

export const loginUser = async(req,res,next)=>{
    //validating login details
const {error,value} = loginUserValidator.validate(req.body);
if (error){
   return res.status(409).json(error)
}

//find matching user record in database

const user = UserModel.findOne({
    $or:[
        {username:value.name},
        {email:value.email}
    ]
});

if (!user){
    res.status(409).json('User does not exist')
}
//compare incoming password with saved password
const correctPassword = bcrypt.compare(value.password,user.password);
if (!correctPassword){
    return res.status(401).json('Invalid credentials')
}
//Generate Access Token 
const accessToken = jwt.sign(
    {id: user.id},
    process.env.JWT_SECRET_KEY,
    {expiresIn: '24h'}
)
//return response
res.status(200).json({accessToken});
}