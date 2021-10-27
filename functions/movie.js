exports.handler = async function (event) {
  const info = JSON.parse(event.body)
  const { apiKey, keyword, page } = info
  const url = `https://www.omdbapi.com?apikey=${apiKey}&s=${keyword}&page=${page}`
  const chunk = await fetch(url).then(res => res.json())
  return {maxPage : chunk.totalResults, list : JSON.stringify(chunk.Search)}
}
