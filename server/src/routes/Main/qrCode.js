import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  models
} from "../imports"

var express = require("express");
var router = express.Router();

//validate for inputs
router.get("/scan", async (req, res) => {
  try {
    let qrCode = req.query.qrCode.split("/");
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if(validate){

      let data = await models.Cafes.findOne({
        attributes: ["cafeID", "cafeName", "cafePoint", "cafeDescription", "cafeImagePath"],
        where: {
          cafeID: qrCode[0]
        },
        include: [{
          required: true,
          model: models.Tables,
          attributes: ["tableName"],
          where: {
            tableID: qrCode[1]
          },
        }]
      });
      if (data !== null) {
        delete data.dataValues.tblTables
        let cafe = { ...data.dataValues, tableName: data.tblTables[0].tableName }
        res.json({ err: false, cafe });
        
      } else throw new Error()
    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
