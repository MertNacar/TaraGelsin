import {
  Op,
  jwt,
  models,
  regex
} from "../imports"
import moment from 'moment'
var express = require("express");
var router = express.Router();

//validate for inputs
router.get("/scan", async (req, res) => {
  try {
    let qrCode = req.query.qrCode.split("/");

    let cafeValid = regex.validateRegex(regex.uuidRegex, qrCode[0])
    let branchValid = regex.validateRegex(regex.uuidRegex, qrCode[1])
    let sectionValid = regex.validateRegex(regex.uuidRegex, qrCode[2])
    let tableValid = regex.validateRegex(regex.uuidRegex, qrCode[3])

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    const now = moment().format("YYYY-MM-DD")

    if (cafeValid && branchValid && sectionValid && tableValid && tokenValid) {
      let data = await models.CafeBranchSectionTables.findOne({
        attributes: ["cafeID", "branchID", "sectionID", "tableID"],
        include: [{
          required: true,
          model: models.Cafes,
          attributes: ["name", "description", "imagePath", "discount"],
          where: {
            cafeID: qrCode[0], 
            subscriptionEndDate: {
              [Op.gt]: now
            }
          },
        },
        {
          required: true,
          model: models.Branches,
          attributes: ["name", "point", "discount"],
          where: {
            branchID: qrCode[1],
            active: true
          },
        },
        {
          required: true,
          model: models.Sections,
          attributes: ["name_en", "name_tr"],
          where: {
            sectionID: qrCode[2]
          },
        },
        {
          required: true,
          model: models.Tables,
          attributes: ["name_en", "name_tr"],
          where: {
            tableID: qrCode[3]
          },
        }]
      });

      console.log(data)
      if (data !== null) {
        //delete data.dataValues.tblTables
        //let cafe = { ...data.dataValues, tableName: data.tblTables[0].tableName }
        res.json({ err: false, data });

      } else throw new Error()
    } else throw new Error()
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

export default router;
