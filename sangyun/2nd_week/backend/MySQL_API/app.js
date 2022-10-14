const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const { getBook, addBook, putBook, deleteBook } = require("./book.controller");
const {getAuthor, addAuthor} = require('./author.controller');

const app = express();
app.use(express.json());

const { DataSource } = require('typeorm');
// in .env file
// TYPEORM_CONNECTION = mysql
// TYPEORM_HOST = 127.0.0.1
// TYPEORM_USERNAME = root
// TYPEORM_PASSWORD = sqlPassword
// TYPEORM_DATABASE = dbmate_test
// TYPEORM_PORT = 3306
// TYPEORM_LOGGING =TRUE

// DATABASE_URL = "mysql://root:sqlPassword@127.0.0.1:3306/dbmate_test"

const dataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

dataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

// book route
app.get('/book', getBook(dataSource));
app.post("/book", addBook(dataSource));
app.put("/book", putBook(dataSource));
app.delete("/book/:id", deleteBook(dataSource));

// author route
app.get("/author", getAuthor(dataSource));
app.post("/author", addAuthor(dataSource));

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
