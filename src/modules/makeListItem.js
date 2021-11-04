import { modal } from './modalCtrl'

// params (영화 정보, 결과 표시할 ul, 모달) 요소들
// action 생성되는 각 li에 영화 정보 입력 및 클릭 이벤트 부여 callback: modal
export function makeListItem (list, resultContainer, modalWindow) {
  let ulEl = resultContainer.querySelector('ul')
  if (!ulEl) {
    const newUl = document.createElement('ul')
    newUl.classList.add('list')
    ulEl = newUl
  } 
  list.forEach(movie => {
    const liEl = document.createElement('li')
    const imgEl = document.createElement('img')
    const strongEl = document.createElement('strong')
    if (movie.Poster !== 'N/A') {
      imgEl.src = movie.Poster
      liEl.addEventListener('click', ()=>modal(movie.Title, movie.Poster, modalWindow))
    } else {
      imgEl.src = 'https://via.placeholder.com/160x218/000000/FFFFFF/?text=NoImage'
    }
    imgEl.alt = movie.Title
    imgEl.title = movie.Title
    movie.Title.length > 19 
    ? strongEl.textContent = movie.Title.slice(0, 18) + '...'
    : strongEl.textContent = movie.Title
    liEl.append(imgEl)
    liEl.append(strongEl)
    ulEl.append(liEl)
  })
  resultContainer.append(ulEl)
}
