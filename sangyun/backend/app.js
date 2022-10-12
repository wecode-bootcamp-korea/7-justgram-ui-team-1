const express = require('express');
const {signup, getUser} = require('./user.controller');
const {addPost, getPost, updatePost, removePost} = require('./post.controller');

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

// 아래에 코드를 작성해 주세요.
const app = express();
app.use(express.json());

// users
app.post('/user', signup(users));
app.get(('/user/:id'), getUser(users, posts));


// posts
app.post('/post', addPost(users, posts));
app.get('/post', getPost(users, posts));
app.patch('/post/:id', updatePost(users, posts));
app.delete(('/post/:id'), removePost(users, posts));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
