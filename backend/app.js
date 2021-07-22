const express = require('express')
const app = express()

const auth = require('./routes/auth')
const books = require('./routes/books')
const readers = require('./routes/readers')
const copyForms = require('./routes/copyForms')
const admin = require('./routes/admin')
const employee = require('./routes/employee')
// const isAuth = require('./authorization/authorization')

const PORT = process.env.PORT || 8080

const Author = require('./entities/author');
const Book = require('./entities/book')
const CopyForm = require('./entities/copyForm')
const PublishingHouse = require('./entities/publishingHouse')
const User = require('./entities/user')
const BookPubHouse = require('./entities/bookPubHouse')
const BookAuthor = require('./entities/bookAuthor')


const sequelize = require('./utils/database')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
    
app.use(express.json())
app.use('/auth',  auth)
app.use('/books', books)
app.use('/readers', readers)
app.use('/copyForms', copyForms)
app.use('/admin', admin)
app.use('/employee', employee)

sequelize
    .sync({force: false})
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
        return User.create({
            name: 'admin',
            password: 'root',
            email: 'admin@mail.ru',
            isAdmin: true,
            isEmployee: true
      })
    }
    return user
  })
  .catch(err => {
    console.log(err)
  })

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

User.hasMany(CopyForm)
CopyForm.belongsTo(User)
Book.hasMany(CopyForm, { onDelete: "cascade" })
CopyForm.belongsTo(Book, { onDelete: "cascade" })
Author.belongsToMany(Book, { through: BookAuthor })
Book.belongsToMany(Author, { through: BookAuthor })
Book.belongsToMany(PublishingHouse, {through: BookPubHouse})
PublishingHouse.belongsToMany(Book, {through: BookPubHouse})

app.listen(PORT, () => {
    console.log('App running on port', PORT)
})

//library_db 