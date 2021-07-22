const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const Book = Sequelize.define("book", {
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
    numberOfCopies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // rating: {
    //     type: DataTypes.INTEGER,
    // },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Book