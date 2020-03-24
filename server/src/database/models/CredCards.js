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

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    cvv: {
      type: Sequelize.CHAR(3),
      allowNull: false
    },

    date: {
      type: Sequelize.CHAR(4),
      allowNull: false
    },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },

  }
);

Users.hasMany(CredCards, { foreignKey: 'userID', allowNull: false });
CredCards.belongsTo(Users, { foreignKey: 'userID', allowNull: false });

export default CredCards