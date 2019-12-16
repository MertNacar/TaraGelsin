const sequelize = require('./index');
const Sequelize = require('sequelize');


const TalentModel = sequelize.define("tblTalent", {
    talentID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
    },
    talentName: Sequelize.STRING
},
    {
        freezeTableName: true,
        timestamps: false
    }
)



module.exports = TalentModel;