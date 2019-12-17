import db from "../connection"
import Sequelize from "sequelize"

export default Cafes = db.define(
  "tblCafes",
  {
    cafeID: {
      primaryKey: true,
      type: Sequelize.UUIDV4
    },

    cafeOwner: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafeName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cafeUserName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cafePassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cafePhone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cafeCountry: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    cafeCity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    cafeZIP: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafeImage: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);