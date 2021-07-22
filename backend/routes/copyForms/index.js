const express = require('express')
const router = express.Router()
const CopyForm = require('../../entities/copyForm')
const User = require('../../entities/user')
const Book = require('../../entities/book')

router.get('/', async (req, res) => {
    let forms = await CopyForm.findAll({order: [['id', 'ASC']]})
    for (let i = 0; i < forms.length; i++){
        let user = await User.findByPk(forms[i].userId)
        let book = await Book.findByPk(forms[i].bookId)
        if (user.email === 'admin@mail.ru') {
            forms[i].dataValues.user = ""
        } else {
            forms[i].dataValues.user = user.email
        }
        forms[i].dataValues.book = book.name
    }
    res.status(201).json({
        data: forms
    })
})
//returnBook
router.post('/returnBook', async (req, res) => {
    const formId = req.body.id
    console.log(formId)
    CopyForm.update({
            userId : 1, 
            dateOfIssue : null, 
            returnDate : null
        } , {
            where : {
                id: formId
            }
    })
    res.json({
        msg: "Book has been returned"
    })              
})
module.exports = router
