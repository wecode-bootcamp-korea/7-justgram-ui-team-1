const express = require('express');
const app = express();
const axios = require('axios');

// 개인의 고유 KEY 값을 감추기 위해 dotenv 라이브러리를 활용함
require("dotenv").config();
//
app.use(express.json());

app.get(('/boxoffice'), async (req, res) => {
  let result;
  const key = process.env.MOVIE_KEY;
  const targetDt = "20200520";
  const url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}&targetDt=${targetDt}`;

  await axios.get(url)
        .then((res) => {
          result = res;
        })
        .catch((err) => {
          result = err;
        }
  );
  console.dir(result);
  res.send(result.data);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});