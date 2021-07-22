const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')
const {hashSync, genSaltSync} = require('bcryptjs')

const User = Sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('password', hashSync(value, genSaltSync(10)))
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isAdmin: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isEmployee: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = User
