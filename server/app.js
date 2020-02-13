import "dotenv/config";
import db from "./src/database/connection";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import models from "./src/database/models/index";
import morgan from "morgan";
import auth from "./src/routes/Auth/index"
import main from "./src/routes/Main/index";
import shop from "./src/routes/Shop/index";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(`/${process.env.API}/auth/login`, auth.login)
app.use(`/${process.env.API}/auth/signup`, auth.signup)
app.use(`/${process.env.API}/auth/forget`, auth.forget)
app.use(`/${process.env.API}/main/profile`, main.profile)
app.use(`/${process.env.API}/main/qrCode`, main.qrCode)
app.use(`/${process.env.API}/shop/menu`, shop.menu)
app.use(`/${process.env.API}/shop/cafe`, shop.cafe)
app.use(`/${process.env.API}/shop/waiter`, shop.waiter)
app.use(`/${process.env.API}/shop/cart`, shop.cart)

app.get("/test", async (req, res) => {
  try {
    let Cafes = await models.Cafes.findAll();
    let Categories = await models.Categories.findAll();
    let CredCards = await models.CredCards.findAll();
    let Extras = await models.Extras.findAll();
    let Foods = await models.Foods.findAll();
    let Ingredients = await models.Ingredients.findAll();
    let OrderDetails = await models.OrderDetails.findAll();
    let Orders = await models.Orders.findAll();
    let Tables = await models.Tables.findAll();
    let Users = await models.Users.findAll();
    let Subscriptions = await models.Subscriptions.findAll();
    let PaymentMethods = await models.PaymentMethods.findAll();
    let Countries = await models.Countries.findAll();
    let Cities = await models.Cities.findAll();
    let CafeOwners = await models.CafeOwners.findAll();
    let OrderDetailExtras = await models.OrderDetailExtras.findAll();
    let CafeTables = await models.CafeTables.findAll();
    let FoodExtras = await models.FoodExtras.findAll();
    let FoodIngredients = await models.FoodIngredients.findAll();
    let Devices = await models.Devices.findAll();

    res.send({
      err: false,
      Cafes,
      Categories,
      CredCards,
      Extras,
      Foods,
      Ingredients,
      OrderDetails,
      Orders,
      Tables,
      Users,
      Subscriptions,
      PaymentMethods,
      Countries,
      Cities,
      CafeOwners,
      OrderDetailExtras,
      CafeTables,
      FoodExtras,
      FoodIngredients,
      Devices
    });
  } catch (err) {
    res.send({ err: true, err: err.message });
  }
});

db.authenticate()
  .then(() => {
    console.log("Bağlantı başarıyla kuruldu.");
  })
  .catch(err => {
    console.error("Bağlanılamıyor:", err);
  });

http.createServer(app).listen(process.env.HTTP_PORT);
console.log("Server listening on " + process.env.HTTP_PORT);
