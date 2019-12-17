import 'dotenv/config';
import db from './src/database/connection'
import http from 'http'
import express from 'express';
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate()
  .then(() => {
    console.log("Bağlantı başarıyla kuruldu.");
  })
  .catch(err => {
    console.error("Bağlanılamıyor:", err);
  });

http.createServer(app).listen(process.env.HTTP_PORT);