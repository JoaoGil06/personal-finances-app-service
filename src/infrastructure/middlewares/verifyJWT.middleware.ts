import { RequestHandler } from "express";
import { Jsonwebtoken } from "../adapters/jwt.adapter";
import { JWT_SECRET } from "../constants/env";

const verifyJWT: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(" ")[1];
  const jwt = new Jsonwebtoken();
  jwt.verify({
    token,
    secretOrPublicKey: JWT_SECRET,
    callback: (err) => {
      if (err) return res.sendStatus(403);

      next();
    },
  });
};

export default verifyJWT;
