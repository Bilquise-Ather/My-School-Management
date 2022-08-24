const { Sequelize } = require("sequelize");
const sequelize = require('../config/db');


// sequelize.sync({ force: true })
const StaffAuth = sequelize.define("staffauth", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    staffId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
    },
    staffstatus: {
        type: Sequelize.TEXT
    },
    token: {
        type: Sequelize.STRING,
        // allowNull: false,
    }

},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = StaffAuth;