const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// sequelize.sync({ force: true })
const Principal = sequelize.define('principal', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    adminId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    principalName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mobileNo: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.TEXT
    },
    image: {
        type: Sequelize.TEXT
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Principal;
