const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// sequelize.sync({ force: true })
const Staff = sequelize.define('staff', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    mobileNo: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Staff;
