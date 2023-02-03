import { NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface payload extends JwtPayload {
  _id: string;
  email: string;
}
const secret = "rrneitnijtnntyhdvatywqopqwi";

export const generateToken = (user: payload) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};

// const userAuth = (req: Request, res: Response, next: NextFunction) => {
//   const headers = req.headers.authorization;
//   if (!headers || !headers.startsWith('Bearer '))

// }
