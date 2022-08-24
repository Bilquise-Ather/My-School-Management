const { Sequelize } = require("sequelize");
const sequelize = require('../config/db');


// sequelize.sync({ force: true })
const UserAuth = sequelize.define("userauth", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    isPrincipal: {
        type: Sequelize.TEXT,
        
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

module.exports = UserAuth;