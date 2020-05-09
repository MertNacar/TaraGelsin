import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  regex,
  models
} from "../imports"

var express = require("express");
var router = express.Router();

//validate for inputs
router.post("/make-payment", async (req, res) => {
  try {
    let { place, cost, note, foods, userID, cardID } = req.body.data;
    let token = req.headers.authorization.split(" ")[1];

    let cafeValid = regex.validateRegex(regex.uuidRegex, place.cafeID)
    let branchValid = regex.validateRegex(regex.uuidRegex, place.branchID)
    let sectionValid = regex.validateRegex(regex.uuidRegex, place.sectionID)
    let tableValid = regex.validateRegex(regex.uuidRegex, place.tableID)
    let userValid = regex.validateRegex(regex.uuidRegex, userID)
    let cardValid = regex.validateRegex(regex.uuidRegex, cardID)
    let costValid = regex.validateRegex(regex.costRegex, cost)
    let noteValid = regex.validateRegex(regex.commentRegex, note)
    let tokenValid = jwt.validateToken(token);

    let foodValidations = foods.filter(food => {
      let foodAndExtras = food.foodID.split(":")
      console.log('foodAndExtras', foodAndExtras)
      let valids = foodAndExtras.filter(item => regex.validateRegex(regex.uuidRegex, item))
      console.log('valids', valids)
      console.log('valids valids', (valids.length === foodAndExtras.length))
      console.log('qty', regex.validateRegex(regex.qtyRegex, food.quantity))
      return regex.validateRegex(regex.qtyRegex, food.quantity) && (valids.length === foodAndExtras.length)
    })
    console.log('foodValidations', foodValidations)
    let foodValid = foodValidations.length === foods.length
    console.log('foodValid', foodValid)





    let validation = cafeValid && branchValid && sectionValid && tableValid &&
      userValid && cardValid && costValid && noteValid && tokenValid && foodValid


    if (validation) {
      let order = await models.Orders.create({ status: 0, cost, note, ...place, userID, cardID });
      let extras = []
      console.log('order', order)
      console.log(' eski foods', foods)
      foods.forEach(async item => {
        try {
          console.log('item', item)
          let foodAndExtras = item.foodID.split(":")
          item.orderID = order.orderID
          item.foodID = foodAndExtras[0]
          let orderDetail = await models.OrderDetails.create(item)
          console.log('orderDetail', orderDetail)
          if (foodAndExtras.length > 1)
            for (let i = 1; i < foodAndExtras.length; i++)
              extras.push({ orderDetailID: orderDetail.orderDetailID, extraID: foodAndExtras[i] })
        } catch (err) {
          console.log('err', err.message)
        }
      })
      console.log(' yeni foods', foods)
      console.log('extras', extras)
      let k
      if (extras.length > 0) {
        console.log('extras', extras)
        k = await models.OrderDetailExtras.bulkcreate(extras)
      }
      console.log('k', k)
      res.json({ err: false });

    } else throw new Error()
  } catch (err) {
    console.log('err.message', err.message)
    res.json({ err: true });
  }
});

export default router;
