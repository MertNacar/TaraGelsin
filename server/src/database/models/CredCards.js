import db from "../connection"
import Sequelize from "sequelize"
import Users from './Users'

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
      allowNull: false,
      unique: true
    },

    cardCvv: {
      type: Sequelize.CHAR(3),
      allowNull: false
    },

    cardDate: {
      type: Sequelize.CHAR(4),
      allowNull: false
    },

  }
);

Users.hasMany(CredCards, { foreignKey: 'userID', allowNull: false });
CredCards.belongsTo(Users, { foreignKey: 'userID', allowNull: false });

export default CredCards