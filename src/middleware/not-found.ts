import { ErrorRequestHandler } from "express";

const notFound: ErrorRequestHandler = (_e, _, res, _next) => {
  res.status(404).send("Route does not exist");
};

export default notFound;
