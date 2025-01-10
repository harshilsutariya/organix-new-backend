import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors";

const authAPIkey = async (req: Request, _res: Response, next: NextFunction) => {
  // check header
  const apikey = req.headers.apikey;
  console.log(apikey, apikey == process.env.API_KEY);

  if (!apikey || !(apikey == process.env.API_KEY)) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  next();
};

export default authAPIkey;
