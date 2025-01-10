declare module "express-async-errors";
declare namespace Express {
  export interface Request {
    user: {
      userId?: string;
    };
  }
}
declare module "xss-clean" {
  const value: Function;

  export default value;
}
