import db from "../connection"
import Sequelize from "sequelize"
import SubscriberTypes from './SubscriberTypes'
import Plans from './Plans'
const Cafes = db.define(
  "Cafes",
  {
    cafeID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },

    description: Sequelize.STRING(120),

    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    discount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },

    subscriptionStartDate: Sequelize.DATE,

    subscriptionEndDate: Sequelize.DATE,
  },
  {
    timestamps: true,
    tableName: "tblCafes"
  }
);


SubscriberTypes.hasMany(Cafes, { foreignKey: 'subscriberTypeID' });
Cafes.belongsTo(SubscriberTypes, { foreignKey: 'subscriberTypeID' });

Plans.hasMany(Cafes, { foreignKey: 'planID' });
Cafes.belongsTo(Plans, { foreignKey: 'planID' });

export default Cafes