import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface payload extends JwtPayload {
  _id: string;
  email: string;
}
const secret = "rrneitnijtnntyhdvatywqopqwi";

export const generateToken = (user: payload) => {
  return jwt.sign(user, secret as Secret, { expiresIn: "1h" });
};
