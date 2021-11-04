const axios = require('axios')
const { apikey } = process.env

exports.handler = async function (event) {
  const {httpMethod, queryStringParameters } = event
  if (httpMethod === 'GET') {
    const { keyword, page } = queryStringParameters
    const url = `https://www.omdbapi.com?apikey=${apikey}&s=${keyword}&page=${page}`
    const chunk = await axios.get(url)
    return {
      statusCode: 200,
      body: JSON.stringify(chunk.data)
    }
  }
}

// event로 받은 내용
// headers: {x-forwarded-for: '::1', cookie: '_xsrf=2|93f09973|ca0b7a2b2d82d48abbafcafab43ec99c|…b0e207e2891915ffd7cb1278d408eafb7a1155ffd78d0108"', accept-language: 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7', accept-encoding: 'gzip, deflate, br', referer: 'http://localhost:8888/', …}
// httpMethod: "GET"
// isBase64Encoded: false
// multiValueHeaders: {x-forwarded-for: Array(1), cookie: Array(1), accept-language: Array(1), accept-encoding: Array(1), referer: Array(1), …}
// multiValueQueryStringParameters: {keyword: Array(1), page: Array(1)}
// path: "/.netlify/functions/list"
// queryStringParameters:
// keyword: "frozen"
// page: "1"
// [[Prototype]]: Object
// rawQuery: "keyword=frozen&page=1"
// rawUrl: "http://localhost:8888/.netlify/functions/list?keyword=frozen&page=1"


// post 로 body 받을 경우
// exports.handler = async function (event) {
//   const { keyword, page } = JSON.parse(event.body)
//   const url = `https://www.omdbapi.com?apikey=${apikey}&s=${keyword}&page=${page}`
//   const chunk = await axios.get(url)
//   return {
//     statusCode: 200,
//     body: JSON.stringify(chunk.data)
//   }
// }
