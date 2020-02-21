import db from "../connection"
import Sequelize from "sequelize"
import Subscriptions from './Subscriptions'
import CafeOwners from './CafeOwners'
import Countries from './Countries'
import Cities from './Cities'

const Cafes = db.define(
  "tblCafes",
  {
    cafeID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    cafeName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafeUsername: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafePassword: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafePoint: Sequelize.DECIMAL(2, 1),

    cafePhone: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafeAddress: {
      type: Sequelize.STRING(120),
      allowNull: false
    },

    cafeDescription: {
      type: Sequelize.STRING(120),
    },

    cafeImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    cafeDiscount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },

    isSubscriber: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

    subscriptionEndDate: Sequelize.DATE,

  }
);


Subscriptions.hasMany(Cafes, { foreignKey: 'subscriptionID' });
Cafes.belongsTo(Subscriptions, { foreignKey: 'subscriptionID' });

CafeOwners.hasMany(Cafes, { foreignKey: 'cafeOwnerID', allowNull: false });
Cafes.belongsTo(CafeOwners, { foreignKey: 'cafeOwnerID', allowNull: false });

Countries.hasMany(Cafes, { foreignKey: 'countryID', allowNull: false });
Cafes.belongsTo(Countries, { foreignKey: 'countryID', allowNull: false });

Cities.hasMany(Cafes, { foreignKey: 'cityID', allowNull: false });
Cafes.belongsTo(Cities, { foreignKey: 'cityID', allowNull: false });



export default Cafes