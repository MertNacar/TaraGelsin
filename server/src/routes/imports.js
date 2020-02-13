import "dotenv/config";
import express from "express"
import Sequelize from "sequelize"
import models from "../database/models/index"
import { hashPassword, verifyPassword } from "../database/hashing/index"
import jwt from "../tokenize/index"
import cloudinary from "cloudinary"
import * as regex from '../regex/regex'
const Op = Sequelize.Op

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export {
  Sequelize,
  express,
  jwt,
  Op,
  models,
  hashPassword,
  verifyPassword,
  cloudinary,
  regex
}

