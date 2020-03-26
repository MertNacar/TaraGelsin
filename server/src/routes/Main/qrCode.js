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
      let cafe = await models.CafeBranchSectionTables.findOne({
        attributes: {
          exclude: ["cafeID", "branchID", "sectionID", "tableID", "createdAt", "updatedAt"]
        },
        plain: true,
        include: [{
          required: true,
          model: models.Cafes,
          attributes: ["cafeID", "name", "description", "imagePath", "discount"],
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
          attributes: ["branchID", "name", "point", "address", "discount"],
          where: {
            branchID: qrCode[1],
            active: true
          },
        },
        {
          required: true,
          model: models.Sections,
          attributes: ["sectionID", "name_en", "name_tr"],
          where: {
            sectionID: qrCode[2]
          },
        },
        {
          alias: "table",
          required: true,
          model: models.Tables,
          attributes: ["tableID", "name_en", "name_tr"],
          where: {
            tableID: qrCode[3]
          },
        }]
      });

      if (cafe !== null) res.json({ err: false, cafe });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
