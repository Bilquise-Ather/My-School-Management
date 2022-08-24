const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// sequelize.sync({ force: true })
const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    adminName: {
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
    isAdmin: {
        type: Sequelize.TEXT
    },
    isPrincipal: {
        type: Sequelize.TEXT
    },
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Admin;
