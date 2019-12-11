import jwt from "jsonwebtoken"
import options from "./options"
import fs from "fs"
const PRIVATE_KEY = fs.readFileSync("./src/Tokenize/private.key", "utf8");
const PUBLIC_KEY = fs.readFileSync("./src/Tokenize/public.key", "utf8");

const validateToken = token => {
  return jwt.verify(token, PUBLIC_KEY, options.verifyOptions());
};

const createToken = username => {
  return jwt.sign({ username }, PRIVATE_KEY, options.signOptions());
};

export { validateToken, createToken }
