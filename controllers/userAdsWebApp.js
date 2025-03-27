import { userModel } from "../models/userModels.js";
import { sendEmail } from "../utils/mailing.js";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../validators/userAdsWebApp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = registerUserValidator.validate({
      ...req.body,
      uploadLogo: req.file?.filename,
    });
    if (error) {
      return res.status(422).json(error);
    }
    const user = await userModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (user) {
      res.status(409).json("User already exist");
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    const newUser = await userModel.create({
      ...value,
      password: hashedPassword,
    });
    const sendWelcomeEmail = await sendEmail(
      newUser.email,
      "Welcome To Notes",
      `Hello ${newUser.username} You are welcome`
    );
    return res.status(201).json({
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    console.log('ikikokkiokikiiik9ok9ok9ok9ok9o')
    const { error, value } = loginUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    console.log('ecfedc', value)
    const user = await userModel.findOne({ email: value.email });
    console.log('dwde', user)
    if (user) {
      const comparePassword = bcrypt.compareSync(value.password, user.password);
      if (!comparePassword) {
        return res.status(401).json("Invalid credentials!");
      }
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
      });
      console.log('token', accessToken)
      return res.status(200).json({
        id: user.id,
        role: user.role,
        accessToken,
      });
    } else {
      return res.send("user does not exist");
    }
  } catch (error) {
    next(error)
  }
}


  export const updateUser = async (req, res, next) => {
    try {
    const { error, value } = updateUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    const result = await userModel.findByIdAndUpdate(req.params.id, value, {
      new: true,
    });
    res.status(200).json(result);
} catch (error) {
  next(error)
}
  }


export const getAuthenticatedUser = async (req, res, next) => {
  try {
    const result = await userModel
      .findById(req.auth.id)
      .select({ password: false });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
  
