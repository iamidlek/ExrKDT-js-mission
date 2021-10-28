import { searchStart } from './modules/searchStart'
import { observer } from './modules/observer'
import { modalClose } from './modules/modalCtrl'

import '~/scss/main.scss'

// Home El(Main Page)
const formEl = document.querySelector('form')

// Result Page El
const resultCT = document.querySelector('.result')
const TopBtn = resultCT.querySelector('.top')
  // Top으로 이동하는 버튼 관리
observer(TopBtn, formEl)
TopBtn.addEventListener('mousedown', () => window.scrollTo({top:0, behavior:'smooth'}))

// Modal El
const modalWindow = document.querySelector('.modal')
  // 모달 종료
modalWindow.addEventListener('click', modalClose)

  // 검색 시작
formEl.addEventListener('submit', event => searchStart(event, formEl, resultCT, modalWindow))
