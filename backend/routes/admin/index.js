const express = require('express')
const router = express.Router()
const User = require('../../entities/user')

router.post('/makeUserEmployee', async (req, res) => {
    const email = req.body.email
    let user = await User.findOne({where: {email: email}})
    if(!user){
        res.json({
            msg: "No user with such email"
        })
        return
    }
    User.update({
            isEmployee : true
        } , {
            where : {
                email: email
            }
    })
    res.json({
        msg: "Action completed successfully"
    })              
})
router.post('/makeEmployeeUser', async (req, res) => {
    const email = req.body.email
    let user = await User.findOne({where: {email: email}})
    if(!user){
        res.json({
            msg: "No user with such email"
        })
        return
    }
    User.update({
            isEmployee : false
        } , {
            where : {
                email: email
            }
    })
    res.json({
        msg: "Action completed successfully"
    })              
})
module.exports = router
