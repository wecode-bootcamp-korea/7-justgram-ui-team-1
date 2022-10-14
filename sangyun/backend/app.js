const express = require('express');
const {signup, getUser} = require('./user.controller');
const {addPost, getPost, updatePost, removePost} = require('./post.controller');

const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // morgan 모듈 추가하기
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

let posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const { DataSource } = require('typeorm');
// in .env file
// TYPEORM_CONNECTION = mysql
// TYPEORM_HOST = 127.0.0.1
// TYPEORM_USERNAME = root
// TYPEORM_PASSWORD = sqlPassword
// TYPEORM_DATABASE = justgram
// TYPEORM_PORT = 3306
// TYPEORM_LOGGING =TRUE

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

//
app.get('/test', async (req, res) => {
  const DataSource = await dataSource.query(`SELECT * FROM users`)
                                      .catch((err) => {
                                        console.log("query has failed: ", err.sqlMessage);
                                      })
  console.log("result: ", DataSource);
  res.send("테스트하는 척하며 놀고 싶은 나?");
})

// users router
app.post('/user', signup(users));
app.get(('/user/:id'), getUser(users, posts));

// posts router
app.post('/post', addPost(users, posts));
app.get('/post', getPost(users, posts));
app.patch('/post/:id', updatePost(users, posts));
app.delete(('/post/:id'), removePost(users, posts));


// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
