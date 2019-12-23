import db from "../connection"
import Sequelize from "sequelize"

const Cafes = db.define(
  "tblCafes",
  {
    cafeID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    cafeOwner: {
      type: Sequelize.STRING,
      allowNull: false
    },

    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafePoint: Sequelize.DECIMAL,

    phone: {
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

    isSubscriber: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

    SubscribtionEndDate: Sequelize.DATE,

    cafeImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
);

export default Cafes