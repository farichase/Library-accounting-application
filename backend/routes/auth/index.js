const express = require('express')
const router = express.Router()
const User = require('../../entities/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    const {email} = req.body
    let user = await User.findOne({where: {email: email}})
    res.json({
        username: user.name,
        isAdmin: user.isAdmin,
        isEmployee: user.isEmployee
    })
})
router.post('/signup', (req, res) => {
    const {email, username, password, phoneNumber, address} = req.body
    console.log('Router success', req.body)
    User.count({where: {email}, raw: true})
    .then(result => {
        if (result !== 0) {
            return false
        }
        return true
    }).then(result => {
        if(result) {
            User.create({
                email: email,
                password: password,
                name: username,
                phoneNumber: phoneNumber,
                address: address
            })
            res.json({
                msg: "User registered successfully"
            })
        } else {
            res.json({
                msg: "A user with this email address is already registerd"
            })
        }
    })
})
//changePassword
router.post('/login', async(req, res) => {
    let user = await User.findOne({where: { email: req.body.email }, raw: true})

    if (bcrypt.compareSync(req.body.password, user.password)) {
            let token = jwt.sign({
                data: user.email
            }, 'root', {expiresIn: 60 * 60 * 24 * 7})
            res.status(200).json({
                email: user.email,
                token: token,
            })
    } else {
        res.json({
            msg: "Password or email address entered incorrectly"
        })
    }
})

router.post('/changePassword', async (req, res) => {
    let user = await User.findOne({where: { email: req.body.email }, raw: true})
    if (!user){
        res.sendStatus(404)
    }
    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
        res.json({
            msg: "The current password was entered incorrectly"
        })
    }
    User.update({
        password : req.body.newPassword
    } , {
        where : {
            id: user.id
        }
    })
    res.json({
        msg: "Password has been changed"
    })
})

module.exports = router