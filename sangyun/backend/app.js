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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
