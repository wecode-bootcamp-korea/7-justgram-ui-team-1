const getAuthor = (dataSource) => {
  return async (req, res) => {
    const authors = await dataSource
      .query(`SELECT * FROM authors`)
      .catch((err) => {
        console.log("query has failed: ", err.sqlMessage);
        res.status(500);
        return Promise.resolve([]);
      });

    const msg = authors.map((author) => {
      const { id, first_name, last_name, age } = author;
      return {
        id,
        first_name,
        last_name,
        age,
      };
    });
    res.send(msg);
  };
};

const addAuthor = (dataSource) => {
  return async (req, res) => {
    const { first_name, last_name, age = 7 } = req.body;
    if (!first_name | !last_name) {
      res.status(400).json({ message: "title or description is missing" });
      return;
    }

    const answer = await dataSource
      .query(
        `INSERT INTO authors(
                                    first_name,
                                    last_name,
                                    age
                                  ) VALUES (?, ?, ?);
                                  `,
        [first_name, last_name, age]
      )
      .catch((err) => Promise.resolve(undefined));

    console.dir(answer);

    if (answer) {
      res.status(201).json({ message: "successfully created" });
    } else {
      res.status(500).json({ message: "failed to create" });
    }
  };
};

module.exports = { addAuthor, getAuthor };
