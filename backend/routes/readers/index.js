const express = require('express')
const router = express.Router()
const User = require('../../entities/user')

router.get('/', async(req, res) => {
    User.findAll()
    .then(users => {
        res.status(201).json({
            data: users
        })
    })
})
module.exports = router
