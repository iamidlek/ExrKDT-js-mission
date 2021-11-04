import axios from 'axios'

// params 검색어, 페이지 정보를 받아 data 요청
// return 전체 영화 수, 10개의 영화 정보(1페이지에 해당)
export async function getData (keyword, page) {
  const info = { keyword, page }
  const { data } = await axios.get('/.netlify/functions/list', {params:info})
  return { maxPage: data.totalResults, list: data.Search }
}

// post

// export async function getData (keyword, page) {
//   const info = { keyword, page }
//   const { data } = await axios.post('/.netlify/functions/list', info)
//   return { maxPage: data.totalResults, list: data.Search }
// }
