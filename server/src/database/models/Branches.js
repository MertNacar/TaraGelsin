import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
import Cities from './Cities'

const Branches = db.define(
  "tblBranches",
  {
    branchID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    pin: {
      type: Sequelize.STRING,
      allowNull: false
    },

    point: {
      type: Sequelize.DECIMAL(2,1),
      defaultValue: null
    },

    discount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }
);


Cafes.hasMany(Branches, { foreignKey: 'cafeID' });
Branches.belongsTo(Cafes, { foreignKey: 'cafeID' });

Cities.hasMany(Branches, { foreignKey: 'cityID' });
Branches.belongsTo(Cities, { foreignKey: 'cityID' });

export default Branches