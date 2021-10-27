const axios = require('axios')
const { apikey } = process.env

exports.handler = async function (event) {
  const { keyword, page } = JSON.parse(event.body)
  const url = `https://www.omdbapi.com?apikey=${apikey}&s=${keyword}&page=${page}`
  const chunk = await axios.get(url)
  return {
    statusCode: 200,
    body: JSON.stringify(chunk.data)
  }
}
