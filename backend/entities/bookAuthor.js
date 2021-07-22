const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const BookAuthor = Sequelize.define("bookAuthor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = BookAuthor