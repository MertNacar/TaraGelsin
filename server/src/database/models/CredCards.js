import db from "../connection"
import Sequelize from "sequelize"

const CredCards = db.define(
  "tblCredCards",
  {
    cardID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    cardName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cardNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cardCvv: {
      type: Sequelize.CHAR(3),
      allowNull: false
    },

    cardDate: {
      type: Sequelize.CHAR(4),
      allowNull: false
    },

    cardPinNumber: {
      type: Sequelize.CHAR(4),
      allowNull: false
    },
  }
);

export default CredCards