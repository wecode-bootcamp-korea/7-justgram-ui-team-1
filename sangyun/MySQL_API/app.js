const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

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

//
app.get('/book', async (req, res) => {
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
})

app.post("/book", async (req, res) => {
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
});

// init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
