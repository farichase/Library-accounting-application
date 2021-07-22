const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const PublishingHouse = Sequelize.define("publishingHouse", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = PublishingHouse