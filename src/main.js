import axios from 'axios'
import '~/scss/main.scss'

const formEl = document.querySelector('form')
const home = document.querySelector('.home')
const modalWindow = document.querySelector('.modal')

const resultCT = document.querySelector('.result')
const spinner = resultCT.querySelector('.spinner')
const moveTop = resultCT.querySelector('.top')
const ulEl = resultCT.querySelector('.list')

const observer = new IntersectionObserver(handleTopBtn)
observer.observe(resultCT)

formEl.addEventListener('submit', resultPage)
moveTop.addEventListener('mousedown', goTop)
home.addEventListener('mouseenter', ()=> moveTop.classList.add('none'))
modalWindow.addEventListener('click', modalClose)

async function resultPage (event) {
  event.preventDefault()
  document.body.onscroll = ''
  const keyword = event.target[0].value
  if (!keyword) return

  let page = 1
  let getAdditional = true
  const data = await getData(keyword, page)
  
  if (!data.maxPage || !data.list) {
    noMovieInfo()
  } else {
    initPage()
    setTimeout(()=> {
      makeListItem(data.list)
      document.body.onscroll = touchEnd
      spinner.classList.add('none')
    },1000)
  }
  
  async function touchEnd () {
    if (window.scrollY + window.innerHeight > document.body.clientHeight - 100) {
      if (!getAdditional) {
        return
      } else {
        getAdditional = false
        page += 1
        const data = await getData(keyword, page)
        if(!data.maxPage || !data.list){
          return
        }
        makeListItem(data.list)
      }
    }
    getAdditional = true
  }  
}

function initPage () {
  ulEl.querySelectorAll('li').forEach(li => li.remove())
  if (resultCT.querySelector('.nothing')){
    resultCT.querySelector('.nothing').remove()
  }
  resultCT.classList.remove('none')
  spinner.classList.remove('none')
  window.scrollTo({top:resultCT.offsetTop, behavior:'smooth'})
}

async function getData (keyword, page) {
  const info = {
    keyword,
    page
  }
  const { data } = await axios.post('/.netlify/functions/list', info)
  return { maxPage: data.totalResults, list: data.Search }
}

function makeListItem (list) {
  list.forEach(movie => {
    const liEl = document.createElement('li')
    const imgEl = document.createElement('img')
    const strongEl = document.createElement('strong')
    if (movie.Poster !== 'N/A') {
      imgEl.src = movie.Poster
      liEl.addEventListener('click', ()=>modal(movie.Title, movie.Poster))
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
}
function modal (title, poster) {
  const bigImgEl = document.createElement('img')
  const url = poster.replace('_V1_SX300','_V1_SX700')
  bigImgEl.src = url
  bigImgEl.alt = title
  bigImgEl.title = title
  modalWindow.append(bigImgEl)
  document.body.style.overflow = 'hidden'
  modalWindow.classList.remove('closed')
}
function modalClose () {
  document.body.style.overflow = 'auto'
  modalWindow.querySelector('img').remove()
  modalWindow.classList.add('closed')
}
function noMovieInfo () {
  const inputEl = formEl.querySelector('input')
  inputEl.value = ''
  inputEl.placeholder = '존재하지 않는 영화입니다'
  inputEl.classList.add('nonexistence')
  resultCT.classList.add('none')
  setTimeout(()=> {inputEl.classList.remove('nonexistence')},300)
}

function goTop () {
  moveTop.classList.add('none')
  window.scrollTo({top:0, behavior:'smooth'})
}

function handleTopBtn(entries) {
  entries.forEach( entry => {
    if (entry.isIntersecting) {
      moveTop.classList.remove('none')
    } 
  })
}
