const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const BookPubHouse = Sequelize.define("bookpubhouse", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = BookPubHouse