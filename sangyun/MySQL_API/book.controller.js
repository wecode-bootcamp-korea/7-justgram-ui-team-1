const getBook = (dataSource) => {
  return async (req, res) => {
    const answer = await dataSource.query(`SELECT * FROM books`)
                          .catch((err) => {
                            console.log("query has failed: ", err.sqlMessage);
                            res.status(500);
                            return Promise.resolve([]);
                          });

    const msg = answer.map((book) => {
      const { title, description, cover_image, created_at, updated_at } = book;
      return {
        title,
        description,
        cover_image,
        created_at,
        updated_at,
      };
    });

    res.send(msg);
  }
}

const addBook = (dataSource) => {
  return async (req, res) => {
    const {title, description, coverImage='covDft'} = req.body;
    if (!title | !description) {
      res.status(400).json({ message: "title or description is missing" });
      return;
    }

    const answer = await dataSource.query(
                                    `INSERT INTO books(
                                      title,
                                      description,
                                      cover_image
                                    ) VALUES (?, ?, ?);
                                    `,
                                    [title, description, coverImage]
                                  ).catch((err) => (Promise.resolve(undefined)))

    console.dir(answer);

    if (answer) {
      res.status(201).json({ message: "successfully created" });
    } else {
      res.status(500).json({ message: "failed to create" });
    }
  }
}


module.exports = {addBook, getBook};