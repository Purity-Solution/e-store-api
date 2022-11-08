import { verify } from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY || "LKXTwt0oxAQZXDE";

export const verifyToken = (token: string) => {
  try {
    return verify(token, privateKey);
  } catch (error) {
    console.log("Invalid toke---:", error);
  }
};
