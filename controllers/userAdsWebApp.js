import { userModel } from "../models/userModels.js";
import { sendEmail } from "../utils/mailing.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userAdsWebApp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  //validate user
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  //check if user already exists
  const user = await userModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    res.status(409).json("User already exist");
  }

  //hashing password
  const hashedPassword = await bcrypt.hashSync(value.password, 10);

  //creating the user record in database
  const newUser = await userModel.create({
    ...value,
    password: hashedPassword,
  });

  //send confirmation mail to the user
  const sendWelcomeEmail = await sendEmail(
    newUser.email,
    "Welcome To Notes",
    `Hello ${newUser.username} You are welcome`
  );

  return res.status(201).json({
    message: "user created successfully",
    data: newUser,
  });
  //return response
 
};

export const loginUser = async (req, res, next) => {
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }

  //check if user exists in the database
  const user = await userModel.findOne({email: value.email});

console.log("username", user )

  if (user) {
    console.log(user)
  
  

  //compare incoming password with existing password

  const comparePassword = bcrypt.compareSync(value.password, user.password);
  if (!comparePassword) {
    return res.status(401).json("Invalid credentials!");
  }

  //generate access token
  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  //Return Response
  return res.status(200).json({ accessToken });
} else {
  res.send("user does not exist")
}
};

export const updateUser = async (req, res, next) => {
  //Validate request body
  const { error, value } = updateUserValidator.validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

  //update user in database

  const result = await userModel.findByIdAndUpdate(
    // req.auth.id,
    req.params.id,
    value,
    { new: true }
  );
  //return response
  res.status(200).json(result);
};
