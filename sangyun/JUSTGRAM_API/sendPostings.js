const express = require('express');
const app = express();

app.use(express.json());

const users = [
  {
    id: 1,
    firstName: "pi",
    lastName: "kachu",
    email: "seoulLove@gmail.com",
    mobileNumber: "010-8888-8888",
  },
  {
    id: 2,
    firstName: "lee",
    lastName: "sangyun",
    email: "sororiri@gmail.com",
    mobileNumber: "010-4963-9575",
  },
  {
    id: 3,
    firstName: "me",
    lastName: "tamong",
    email: "mmmmm@gmail.com",
    mobileNumber: "010-6666-7777",
  },
];

let posts = [
  {
    id: 1,
    title: "전압과 출력의 상관관계",
    content: "백만볼트는 노력으로만으로 되는가",
    userId: 1,
  },
  {
    id: 2,
    title: "옴의 법칙",
    content: "저항을 조절한다면?",
    userId: 1,
  },

  {
    id: 1,
    title: "쉬고싶다",
    content: "자고싶다",
    userId: 2,
  },
  {
    id: 2,
    title: "자료구조2번",
    content: "시간복잡도와 공간복잡도",
    userId: 2,
  },

  {
    id: 1,
    title: "변신하기",
    content: "액체화하기",
    userId: 3,
  },

];

app.get(('/user'), (req, res) => {
  const usersWithPost = users.map((user) => {
    return {
      ...user,
      posts : posts.filter((post) => (post.userId == user.id))
    }
  })

  console.dir(usersWithPost, { depth: null });
  res.send(usersWithPost);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});