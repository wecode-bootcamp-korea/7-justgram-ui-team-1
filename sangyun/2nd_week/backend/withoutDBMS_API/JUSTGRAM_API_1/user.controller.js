const signup = (users) => {
  return (req, res) => {
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
  http statusCode: ${res.statusCode}`
    });
  }
}

const getUser = (users, posts) => {
  return (req, res) => {
    const userId = req.params.id;
    const foundedUser = users.find((user) => (user.id == userId));

    if (!foundedUser) {
      res.status(400).send(
        `there is no matched userId
  http statusCode: ${res.statusCode}
      `);
      return;
    }

    const userData = {
      userID : foundedUser.id,
      userName : foundedUser.name,
      postings: posts.filter((post) => (post.userId == userId))
    };

    res.send(userData);

  }
}

module.exports = { signup, getUser };