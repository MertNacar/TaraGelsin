import jwt from "jsonwebtoken"
import options from "./options"
import fs from "fs"
const PRIVATE_KEY = fs.readFileSync("./src/Tokenize/private.key", "utf8");
const PUBLIC_KEY = fs.readFileSync("./src/Tokenize/public.key", "utf8");

const validateToken = token => {
  return jwt.verify(token, PUBLIC_KEY, options.verifyOptions());
};

const createToken = phone => {
  return jwt.sign({ phone }, PRIVATE_KEY, options.signOptions());
};

export default { validateToken, createToken }
