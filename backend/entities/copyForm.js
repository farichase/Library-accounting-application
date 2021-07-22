const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const copyForm = Sequelize.define("copyForm", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateOfIssue: {
        type: DataTypes.STRING,
        allowNull: true
    },
    returnDate: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = copyForm