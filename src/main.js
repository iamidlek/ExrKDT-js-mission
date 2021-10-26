import '~/scss/main.scss'

const apiKey = '7035c60c'
const formEl = document.querySelector('form')

const resultCT = document.querySelector('.result')
const spinner = resultCT.querySelector('.spinner')
const ulEl = resultCT.querySelector('.list')

formEl.addEventListener('submit', resultPage)


async function resultPage (event) {
  event.preventDefault()
  const keyword = event.target[0].value
  if (!keyword) return

  let page = 1
  let getAdditional = true
  const data = await getData(apiKey, keyword, page)
  
  if (!data.maxPage || !data.list) {
    noMovieInfo()
  } else {
    initPage ()
    makeListItem(data.list)
    window.addEventListener('scroll', touchEnd)
  }
  spinner.classList.add('none')
  
  async function touchEnd () {
    console.log('실행됨')
    if (window.scrollY + window.innerHeight > document.body.clientHeight - 100) {
      if (!getAdditional) {
        return
      } else {
        getAdditional = false
        page += 1
        const data = await getData(apiKey, keyword, page)
        if(!data.maxPage || !data.list){
          return
        }
        makeListItem(data.list)
      }
    }
    getAdditional = true
  }  
}


// 

// const io = new IntersectionObserver(entries => {
//   entries.forEach(entry => {
//   	// 관찰 대상이 viewport 안에 들어온 경우 'tada' 클래스를 추가
//     if (entry.intersectionRatio > 0) {
//       entry.target.classList.add('tada');
//     }
//     // 그 외의 경우 'tada' 클래스 제거
//     else {
//       entry.target.classList.remove('tada');
//     }
//   })
// })

// // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
// const boxElList = document.querySelectorAll('.box');
// boxElList.forEach((el) => {
//   io.observe(el);
// })
// 


function initPage () {
  ulEl.querySelectorAll('li').forEach(li => li.remove())
  if (resultCT.querySelector('.nothing')){
    resultCT.querySelector('.nothing').remove()
  }
  resultCT.classList.remove('none')
  spinner.classList.remove('none')
  window.scrollTo({top:resultCT.offsetTop, behavior:'smooth'})
}

async function getData (apiKey, keyword, page) {
  const url = `https://www.omdbapi.com?apikey=${apiKey}&s=${keyword}&page=${page}`
  const chunk = await fetch(url).then(res => res.json())
  return {maxPage : chunk.totalResults, list : chunk.Search}
}

function makeListItem (list) {
  list.forEach(movie => {
    const liEl = document.createElement('li')
    const imgEl = document.createElement('img')
    const strongEl = document.createElement('strong')
    movie.Poster !== 'N/A' ? imgEl.src = movie.Poster : imgEl.src = 'https://via.placeholder.com/150/000000/FFFFFF/?text=NoImage'
    imgEl.alt = movie.Title
    imgEl.title = movie.Title
    movie.Title.length > 19 
    ? strongEl.textContent = movie.Title.slice(0, 18) + '...'
    : strongEl.textContent = movie.Title
    liEl.append(imgEl)
    liEl.append(strongEl)
    ulEl.append(liEl)
  })
}

function noMovieInfo () {
  const inputEl = formEl.querySelector('input')
  inputEl.value = ''
  inputEl.placeholder = '존재하지 않는 영화입니다'
  inputEl.classList.add('nonexistence')
  setTimeout(()=> {inputEl.classList.remove('nonexistence')},300)
}
