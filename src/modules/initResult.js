// params (결과 페이지, 결과 표시할 ul, loading spinner) 요소들
// action ul의 li를 지우고 결과페이지와 로딩 스피너를 보여준다
export function initResult (resultContainer) {
  const ulEl = resultContainer.querySelector('ul')
  if (ulEl) ulEl.remove()
  resultContainer.classList.remove('none')
  window.scrollTo({top:resultContainer.offsetTop, behavior:'smooth'})
}
