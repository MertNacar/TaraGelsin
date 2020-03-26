import db from "../connection"
import Sequelize from "sequelize"
import Branches from './Branches'
import Foods from './Foods'

const BranchFoods = db.define(
  "BranchFoods",
  {
    cost: {
      type: Sequelize.DECIMAL(8,2),
      allowNull: false
    },

    onSale: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps:true,
    tableName: "tblBranchFoods"
  }
);

Branches.belongsToMany(Foods, { through: BranchFoods, foreignKey: 'branchID', otherKey: 'foodID' });
Foods.belongsToMany(Branches, { through: BranchFoods, foreignKey: 'foodID', otherKey: 'branchID' });



export default BranchFoods