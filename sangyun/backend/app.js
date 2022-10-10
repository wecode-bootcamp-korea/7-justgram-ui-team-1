const express = require('express');

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

const posts = [
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

app.post('/user', (req, res) => {
  const {name, email, pwd} = req.body;

  // 예외처리
  if (!name || !email || !pwd) {
    res.status(400).send(
      `plz send detail request for {name, email, pwd}
http statusCode: ${res.statusCode}
    `);
    return;
  }

  users.push({
    id: users.length + 1,
    name,
    email,
    password: pwd,
  });
  res.send({ message:
    `userCreated: ${name}
http statusCode: ${res.statusCode}
    `
  });
});

app.post('/post', (req, res) => {
  const {title, content, userId} = req.body;
  // 예외처리
  const existUserId = users.find((user) => (user.id == userId));
  if (!existUserId) {
    res.status(400).send(
      `there is no matched userId
http statusCode: ${res.statusCode}
    `);
    return;
  }
  if (!title || !content || !userId) {
    res.status(400).send(
      `plz send detail request for {title, content, userId}
http statusCode: ${res.statusCode}
    `);
    return;
  }

  posts.push({
    id: users.length + 1,
    title,
    content,
    userId
  });

  res.send({ message:
    `post Created: ${title}
http statusCode: ${res.statusCode}
    `
  });
});

app.get('/post', (req, res) => {
  const detailPosts = posts.map((post) => {
    return {
      postingId : post.id,
      postingTitle : post.title,
      postingContent : post.content,
      userID : post.userId,
      userName : users.find((user) => (user.id == post.userId)).name
    }
  })
  res.send(detailPosts);
})

app.patch('/post/:id', (req, res) => {
  const postId = req.params.id;
  const foundedPost = posts.find((post) => (post.id == postId));

  if (!foundedPost) {
    res.status(400).send(
      `there is no matched postId
http statusCode: ${res.statusCode}
    `);
    return;
  }

  const {title, content} = req.body;

  if (!title || !content) {
    res.status(400).send(
      `plz send detail request for {title, content}
http statusCode: ${res.statusCode}
    `);
    return;
  }

  foundedPost.title = title;
  foundedPost.content = content;

  updatedPostDetail = {
      postingId : foundedPost.id,
      postingTitle : foundedPost.title,
      postingContent : foundedPost.content,
      userID : foundedPost.userId,
      userName : users.find((user) => (user.id == foundedPost.userId)).name
  };

  res.send(updatedPostDetail);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
