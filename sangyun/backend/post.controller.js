const addPost = (users, posts) => {
  return (req, res) => {
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
  }
}

const getPost = (users, posts) => {
  return (req, res) => {
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
  }
}

const updatePost = (users, posts) => {
  return (req, res) => {
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

    const updatedPostDetail = {
        postingId : foundedPost.id,
        postingTitle : foundedPost.title,
        postingContent : foundedPost.content,
        userID : foundedPost.userId,
        userName : users.find((user) => (user.id == foundedPost.userId)).name
    };

    res.send(updatedPostDetail);
  }
}

const removePost = (users, posts) => {
  return (req, res) => {
    const postId = req.params.id;
    const foundedPost = posts.find((post) => (post.id == postId));

    if (!foundedPost) {
      res.status(400).send(
      `deleting post has failed.
  there is no matched postId
  http statusCode: ${res.statusCode}
  `   );
      return;
    }

    posts = posts.filter((post) => (post.id != postId));
    res.send("deleting has sucessed");
  }
}

module.exports = { addPost, getPost, updatePost, removePost };