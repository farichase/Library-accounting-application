const _ = require('underscore')
const express = require('express')
const router = express.Router()
const Author = require('../../entities/author')
const Book = require('../../entities/book')
const BookAuthor = require('../../entities/bookAuthor')
const BookPubHouse = require('../../entities/bookPubHouse')
const PublishingHouse = require('../../entities/publishingHouse')
const User = require('../../entities/user')

router.post('/addAuthor', async (req, res) => {
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber
    const address = req.body.address
    let item = await Author.findOne({where: {name : name}})
    if (item){
        res.json({
            msg: "The author already exists"
        })
        return
    }
    Author.create({
        name: name,
        phoneNumber: phoneNumber,
        address: address
    }).catch(err => console.log("Cant add author", err))
    res.json({
        msg: "The author was added"
    })
})
router.post('/addPublishingHouse', async (req, res) => {
    const name = req.body.name
    const phoneNumber = req.body.phoneNumber
    const address = req.body.address
    let item = await PublishingHouse.findOne({where: {name : name}})
    if (item){
        res.json({
            msg: "The publishing house already exists"
        })
        return
    }
    PublishingHouse.create({
        name: name,
        phoneNumber: phoneNumber,
        address: address
    }).catch(err => console.log("Cant add publishing house", err))
    res.json({
        msg: "The publishing house was added"
    })
})
router.post('/addBook', async (req, res) => {
    const name = req.body.name
    const genre = req.body.genre
    const authors = req.body.authors
    const houseName = req.body.house

    for (let i = 0; i < authors.length; i++) {
        let author = await Author.findOne({ where: { name: authors[i] } })
        if (!author) {
            res.json({
                msg: "There is no such author"
            })
            return
        }
    }
    let house = await PublishingHouse.findOne({ where: { name: houseName } })
    if (!house) {
        res.json({
            msg: "There is no such publishing house"
        })
        return
    }

    let books = await Book.findAll({ where: { name: name } })
    let isOldBook = false, oldBookIndex
    let houses = [], housesNames = []
    for (let i = 0; i < books.length; i++) {
        let authorsOfBook = await books[i].getAuthors()
        let names = []
        for (let j = 0; j < authorsOfBook.length; j++) {
            names.push(authorsOfBook[j].name)
        }
        if (_.isEqual(names, authors)) {
            isOldBook = true
            houses = await books[i].getPublishingHouses()
            for (let j = 0; j < houses.length; j++){
                housesNames.push(houses[j].name)
            }
            oldBookIndex = i
        }
    }
    if (isOldBook) {
        if (housesNames.indexOf(houseName) === -1) {
            PublishingHouse.findOne({ where: { id: house.id } }).then(item => {
                if (!item) return
                Book.findOne({ where: { id: books[oldBookIndex].id } }).then(book => {
                    if (!book) return
                    item.addBook(book, { through: BookPubHouse })
                })
            })
            Book.update({
                numberOfCopies: books[oldBookIndex].numberOfCopies + 1
            }, {
                where: {
                    id: books[oldBookIndex].id
                }
            })
            res.json({
                msg: "The book was added"
            })
        } else {
            res.json({
                msg: "The book already exists"
            })
        }
        
        return
    }
    let book = await Book.create({
        name: name,
        numberOfCopies: 1,
        genre: genre
    })
    for (let i = 0; i < authors.length; i++) {
        let author = await Author.findOne({ where: { name: authors[i] } })
        Author.findOne({ where: { id: author.id } }).then(item => {
            if (!item) return
            Book.findOne({ where: { id: book.id } }).then(book => {
                if (!book) return
                item.addBook(book, { through: BookAuthor })
            })
        })
    }
    PublishingHouse.findOne({ where: { id: house.id } }).then(item => {
        if (!item) return
        Book.findOne({ where: { id: book.id } }).then(book => {
            if (!book) return
            item.addBook(book, { through: BookPubHouse })
        })
    })

    res.json({
        msg: "The book was added"
    })
})
router.get('/authors', async (req, res) => {
    Author.findAll()
        .then(data => {
            res.status(201).json({
                data: data
            })
        })
})
router.get('/users', async (req, res) => {
    User.findAll()
        .then(data => {
            res.status(201).json({
                data: data
            })
        })
})
router.get('/publishingHouses', async (req, res) => {
    PublishingHouse.findAll()
        .then(data => {
            res.status(201).json({
                data: data
            })
        })
})
module.exports = router
