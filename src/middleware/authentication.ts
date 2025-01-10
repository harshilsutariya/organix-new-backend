import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";

const authenticateUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    // attach the user to the job routes
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

export default authenticateUser;
