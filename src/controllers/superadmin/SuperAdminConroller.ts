import { Request, Response } from "express";
import BadRequestError from "../../errors/bad-request";
import NotFoundError from "../../errors/not-found";
import { StatusCodes } from "http-status-codes";
import SuperAdmin from "../../models/web/superadmin/SuperAdmin";

const signUp = async (req: Request, res: Response) => {
  const { email, name, password, mobileNo } = req.body;
  console.log(email);

  // Validate the required fields
  if (!email || !name || !password || !mobileNo) {
    throw new BadRequestError(
      "Please provide all required fields: email, name, password, and mobileNo."
    );
  }

  // Check if a user with the provided email already exists
  const existingUser = await SuperAdmin.findOne({ email: email });
  if (existingUser) {
    throw new BadRequestError(`User with email ${email} already exists.`);
  }

  // Create a new user
  const newUser: any = await SuperAdmin.create({
    email,
    name,
    password,
    mobileNo,
  });

  // Generate a JWT token for the user
  const token = newUser.createJWT();

  // Remove the password from the response for security
  newUser.password = undefined;

  // Send a success response with the created user data and token
  res.status(StatusCodes.CREATED).json({
    message: "User signed up successfully.",
    user: newUser,
    token: token,
  });
};

export { signUp };
