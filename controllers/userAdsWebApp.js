import { userModel } from "../models/userModels.js";
import {
  loginValidator,
  registerValidator,
} from "../validators/userAdsWebAppValidator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  //validate user
  const { error, value } = registerValidator.validate(req.body);
  if (error) {
    return req.status(422).json(error);
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
  await userModel.create({
    ...value,
    password: hashedPassword,
  });

  //send confirmation mail to the user

  //return response
  res.status(200).json("User registered successfully");
};

export const loginUser = async (req, res, next) => {
  const { error, value } = loginValidator.validate(req.body);
  if (error) {
    res.status(422).json(error);
  }

  //check if user exists in the database
  const user = await userModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    res.status(409).json("User already exist");
  }

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
  res.status(200).json({ accessToken });
};
