const express = require('express')
const Author = require('../../entities/author')
const router = express.Router()
const Book = require('../../entities/book')
const BookAuthor = require('../../entities/bookAuthor')
const PublishingHouse = require('../../entities/publishingHouse')
const BookPubHouse = require('../../entities/bookPubHouse')
const CopyForm = require('../../entities/copyForm')
const User = require('../../entities/user')

router.get('/', async (req, res) => {
    let books = await Book.findAll({order: [['id', 'ASC']]})
    for (let i = 0; i < books.length; i++) {
        let bookauthors = await BookAuthor.findAll({ where: { bookId: books[i].id } })
        let houses = await BookPubHouse.findAll({where: { bookId: books[i].id }})
        let forms = await CopyForm.findAll({where: { bookId: books[i].id }})
        let numberOfCopies = books[i].numberOfCopies
        if (bookauthors.length !== 0) {
            let authors = []
            for (let j = 0; j < bookauthors.length; j++){
                let author = await Author.findByPk(bookauthors[j].authorId)
                authors.push(author.name)
            }
            books[i].dataValues.authors = authors
        }
        if (houses.length !== 0) {
            let arrOfHouses = []
            for (let j = 0; j < houses.length; j++){
                let house = await PublishingHouse.findByPk(houses[j].publishingHouseId)
                arrOfHouses.push(house.name)
            }
            books[i].dataValues.houses = arrOfHouses
        }
        if (forms.length !== 0) {
            let notNullStr = 0
            for (let j = 0; j < forms.length; j++) {
                if (forms[j].returnDate !== null) notNullStr++
            }
            numberOfCopies -= notNullStr 
        }
        books[i].dataValues.quantityInStock = numberOfCopies
    }
    res.status(201).json({
        data: books
    })
})

router.post('/mybooks', async(req, res) => {
    const email = req.body.email
    let user = await User.findOne({where: {email: email}})
    let forms = await CopyForm.findAll({where: {userId: user.id}})
    let books = []
    for (let i = 0; i < forms.length; i++){
        let book = await Book.findOne({where: {id: forms[i].bookId}})
        book.dataValues.formNumber = forms[i].number
        book.dataValues.returnDate = forms[i].returnDate
        books.push(book)
    }
    for (let i = 0; i < books.length; i++) {
        let bookauthors = await BookAuthor.findAll({ where: { bookId: books[i].id } })
        let houses = await BookPubHouse.findAll({where: { bookId: books[i].id }})
        let forms = await CopyForm.findAll({where: { bookId: books[i].id }})
        let numberOfCopies = books[i].numberOfCopies
        if (bookauthors.length !== 0) {
            let authors = []
            for (let j = 0; j < bookauthors.length; j++){
                let author = await Author.findByPk(bookauthors[j].authorId)
                authors.push(author.name)
            }
            books[i].dataValues.authors = authors
        }
        if (houses.length !== 0) {
            let arrOfHouses = []
            for (let j = 0; j < houses.length; j++){
                let house = await PublishingHouse.findByPk(houses[j].publishingHouseId)
                arrOfHouses.push(house.name)
            }
            books[i].dataValues.houses = arrOfHouses
        }
        if (forms.length !== 0) {
            let notNullStr = 0
            for (let j = 0; j < forms.length; j++) {
                if (forms[j].returnDate !== null) notNullStr++
            }
            numberOfCopies -= notNullStr 
        }
        books[i].dataValues.quantityInStock = numberOfCopies
    }
    res.status(201).json({
        data: books
    })
})

router.post('/forms', async (req, res) => {
    const id = req.body.id
    let book = await Book.findByPk(id)
    const forms = await book.getCopyForms({order: [['id', 'ASC']]})
    res.json({
        data: forms
    })
})

router.post('/forms/addForm', async (req, res) => {
    const id = req.body.id
    let queryParams = {
        where: {},
        order: [['id', 'ASC']]
    };
    let forms = await CopyForm.findAll(queryParams)
    let lastFormNumber
    if (forms.length !== 0) {
        lastFormNumber = forms[forms.length - 1].number
    } else {
        lastFormNumber = 0
    }
    let book = await Book.findByPk(id)
    console.log(book)
    if(book.numberOfCopies > forms.length) {
        CopyForm.create({
            number: lastFormNumber + 1,
            bookId: id,
            userId: 1
        }).catch(err => console.log("Cant create copyForm", err))
        console.log("New form created")
    }
    forms = await book.getCopyForms()
    res.json({
        data: forms
    })
})
router.post('/forms/addBookToReader', async (req, res) => {
    const formId = req.body.id
    const email = req.body.email
    const bookId = req.body.bookId
    const book = await Book.findByPk(bookId)
    let form = await CopyForm.findByPk(formId)
    if (!form) {
        res.json({
            msg: "There is no such form"
        })
        return
    }
    form = await book.getCopyForms({where : {id : formId}})
    if (form.length === 0) {
        res.json({
            msg: "There is no such form"
        })
        return
    }
    let forms = await CopyForm.findAll({where: {returnDate: null}})
    if (forms.length === 0) {
        res.json({
            msg: "No books available"
        })
        return
    }
    let user = await User.findOne({where : {email: email}})
    if (!user) {
        res.json({
            msg: "There is no such reader"
        })
        return
    }
    let returnDate = new Date();
    let dateOfIssue = new Date();
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    returnDate.setDate(returnDate.getDate() + 14)
    CopyForm.update({
            userId : user.id, 
            dateOfIssue : dateOfIssue.toLocaleString(options), 
            returnDate : returnDate.toLocaleString(options)
        } , {
            where : {
                id: formId
            }
    })
    res.json({
        msg: "Book has been added"
    })              
})
router.delete('/forms/deleteForm', async(req, res) => {
    const id = req.body.id 
    const bookId = req.body.bookId
    CopyForm.destroy({
        where: { id : id }
    })
    let book = await Book.findByPk(bookId)
    let forms = await book.getCopyForms()
    res.json({
        data: forms
    })
})
router.post('/forms/addCopyOfBook', async(req, res) => {
    const id = req.body.id 
    let book = await Book.findByPk(id)
    Book.update({
        numberOfCopies: book.numberOfCopies + 1
    }, {
        where: {
            id: id
        }
    })
    res.json({})
})
module.exports = router
