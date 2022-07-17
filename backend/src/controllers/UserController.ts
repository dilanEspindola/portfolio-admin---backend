import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User as NewUser, UserSchema } from "../interfaces/interfaces";
import User from "../Models/User";
import config from "../config";

export const userGet = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate("works");
    return res.json(users);
  } catch ({ message }) {
    return res.status(500).json({
      message: message,
    });
  }
};

export const userRegister = async (req: Request, res: Response) => {
  const { name, password, email } = req.body as NewUser;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const saveUser = new User({ name, password: hashedPassword, email });
    const userSaved = (await saveUser.save()) as NewUser;
    const token = jwt.sign({ id: userSaved._id }, config.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      token,
      user: userSaved,
      auth: true,
    });
  } catch (error) {
    throw new Error(error as string);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as NewUser;
  try {
    const getUser = await User.findOne({ email });
    if (!getUser) return res.json({ msg: "email is not valid", auth: false });

    const getUserPassword = getUser.password;
    const validatePassword = await bcrypt.compare(password, getUserPassword);

    if (!validatePassword)
      return res.json({ msg: "wrong password", auth: false });
    const token = jwt.sign({ id: getUser._id }, config.JWT_SECRET as string, {
      expiresIn: "24h",
    });
    return res.status(200).json({ auth: true, token, user: getUser });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json("User deleted");
  } catch ({ message }) {
    return res.status(500).json({ message: message });
  }
};
