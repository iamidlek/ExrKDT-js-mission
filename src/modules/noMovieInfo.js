// params (form 요소, 결과 페이지)
// action 해당 키워드의 영화가 없음을 알린다. 결과 페이지를 비활성화한다.
export function noMovieInfo (search, result) {
  const inputEl = search.querySelector('input')
  inputEl.value = ''
  inputEl.placeholder = '존재하지 않는 영화입니다'
  inputEl.classList.add('nonexistence')
  result.classList.add('none')
  setTimeout(()=> {inputEl.classList.remove('nonexistence')},300)
}
