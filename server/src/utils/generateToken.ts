import { Response } from "express";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;

export default function generateToken(userId: string, res: Response) {
  const token = jwt.sign({ userId }, jwt_secret!, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
}
