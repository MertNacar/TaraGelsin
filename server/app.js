import 'dotenv/config';
import db from './src/database/connection'
import http, { get } from 'http'
import express from 'express';
import bodyParser from "body-parser"
import models from './src/database/models/index'
import morgan from 'morgan'


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get("/test", async (req, res) => {
  try {
    let Cafes = await models.Cafes.findAll()
    let Categories = await models.Categories.findAll()
    let CredCards = await models.CredCards.findAll()
    let Extras = await models.Extras.findAll()
    let Foods = await models.Foods.findAll()
    let Ingredients = await models.Ingredients.findAll()
    let OrderFoods = await models.OrderFoods.findAll()
    let Orders = await models.Orders.findAll()
    let Tables = await models.Tables.findAll()
    let Users = await models.Users.findAll()
    let FoodExtras = await db.query(`SELECT * FROM "tblFoodExtras"`)
    let FoodIngredients = await db.query(`SELECT * FROM "tblFoodIngredients"`)
    res.send({ err: false, Cafes, Categories, CredCards, Extras, Foods, Ingredients, OrderFoods, Orders, Tables, Users, Waiters, FoodExtras, FoodIngredients })
  } catch (err) {
    res.send({ err: true, err: err.message })
  }
})

db.authenticate()
  .then(() => {
    console.log("Bağlantı başarıyla kuruldu.");
  })
  .catch(err => {
    console.error("Bağlanılamıyor:", err);
  });

http.createServer(app).listen(process.env.HTTP_PORT);
console.log("Server listening on " + process.env.HTTP_PORT)