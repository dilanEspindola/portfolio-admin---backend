import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../Models/User";

interface JWTPayload {
  id: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  try {
    if (!token) {
      res.status(401).json({ message: "No token provided" });
    } else {
      const decoded = jwt.verify(
        token.toString(),
        config.JWT_SECRET as string
      ) as JWTPayload;

      const getUser = await User.findById(decoded.id as String);
      if (getUser) return next();
      res.status(401).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
