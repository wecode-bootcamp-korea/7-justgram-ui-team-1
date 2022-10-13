const getBook = (dataSource) => {
  return async (req, res) => {
    const answer = await dataSource.query(
      `SELECT
            books.id,
            books.title,
            books.description,
            books.cover_image,
            authors.first_name,
            authors.last_name,
            authors.age
        FROM books_authors ba
        INNER JOIN authors ON ba.author_id = authors.id
        INNER JOIN books ON ba.book_id = books.id`
      )
                          .catch((err) => {
                            console.log("query has failed: ", err.sqlMessage);
                            res.status(500);
                            return Promise.resolve([]);
                          });

    console.log(answer);
    res.send(answer);
  }
}

const addBook = (dataSource) => {
  return async (req, res) => {
    const {title, description, authorId, coverImage='covDft'} = req.body;
    // 빈란이 없는 지 확인
    if (!title | !description | !authorId) {
      res.status(400).json({ message: "title or description is missing" });
      return;
    }

    // 작성자가 있는 지 확인(없으면 등록 안됨)
    const authorExistAnswer = await dataSource.query(
      `SELECT id FROM authors WHERE id = ${authorId};`,
      []
    ).catch((err) => (Promise.resolve(undefined)));

    if (!authorExistAnswer) {
      res.status(404).json({ message: "책에 대한 작성자가 DB상에 존재하지 않습니다." });
      return;
    }

    // TODO
    // (책)테이블과 (사용자-책)테이블이 동시에 등록되거나 아예 안되거나 할 수 있도록 수정 필요.

    // 책 등록 쿼리
    const answerBook = await dataSource.query(
      `INSERT INTO books(
        title,
        description,
        cover_image
      ) VALUES (?, ?, ?);
      `,
      [title, description, coverImage]
    ).catch((err) => (Promise.resolve(undefined)))

    // 책 등록 쿼리 실패
    if (!answerBook) {
      res.status(500).json({ message: "failed to create" });
      return;
    }

    // 사용자 - 책 등록 쿼리
    const answerBookAuthor = await dataSource.query(
      `INSERT INTO books_authors(
        book_id,
        author_id
      ) VALUES (?, ?);
      `,
      [answerBook.insertId, authorId]
    ).catch((err) => (Promise.resolve(undefined)))

    // 등록 결과값을 클라이언트에게 반환
    if (answerBookAuthor) {
      res.status(201).json({ message: "successfully created" });
    } else {
      res.status(500).json({ message: "failed to create" });
    }
  }
}

const putBook = (dataSource) => {
  return async (req, res) => {
    const { title, description, bookId, coverImage="none.jpg"} = req.body;

    const propsForUpdate = [title, description, coverImage, bookId];
    const targetLength = [...propsForUpdate].filter((value) => (value))
                    .length;
    if (4 != targetLength) {
      res.status(400).json({ message: "plz fill one of 'title, description, coverImage'"});
      return;
    }

    // 책 정보 변경 쿼리
    const result = await dataSource.query(
      `UPDATE books
        SET
          title = ?,
          description = ?,
          cover_image = ?
          WHERE id = ?
      `,
      [ title, description, coverImage, bookId ]
    ).catch((err) => {
      return Promise.resolve(undefined);
    })

    if (!result) {
      res.status(500).json({ message: "failed to update 500?" });
    }

    if (result.affectedRows) {
      res.status(201).json({ message: "successfully updated" });
    } else {
      res.status(400).json({ message: "failed to update" });
    }
  };
}

const deleteBook = (dataSource) => {
  return async(req, res) => {
    const { bookId } = req.params;

    const result = await dataSource.query(
    `DELETE FROM books
    WHERE books.id = ${bookId}
    `).catch((err) => {
      return Promise.resolve(undefined);
    });

    if (!result) {
      res.status(500).json({ message: "failed to update" });
    }

    if (result.affectedRows) {
      res.status(201).json({ message: "successfully updated" });
    } else {
      res.status(400).json({ message: "failed to update" });
    }
  }
}

module.exports = {addBook, getBook, putBook, deleteBook};