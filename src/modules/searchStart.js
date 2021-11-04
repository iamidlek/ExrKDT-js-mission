import { initResult } from './initResult'
import { getData } from './getData'
import { noMovieInfo } from './noMovieInfo'
import { makeListItem } from './makeListItem'

// params 이벤트, form 요소, 결과 페이지 요소, 모달 요소

// action1 이벤트 핸들러를 초기화(삭제)

// exception1 검색 키워드를 입력 하지 않을 경우 => 함수를 종료
// exception2 검색 결과가 없을 경우 => noMovieInfo 함수 실행

// action2 결과가 있을 경우 결과 페이지를 초기화
// additional 로딩 스피너를 보여주기 위해 1초 강제 대기(요구사항 편하게 확인 하기 위함)
// action3 결과를 보여주고 이벤트 핸들러를 통한 handleScroll 함수를 콜백하도록 설정

  // handleScroll 쓰로틀링을 적용한 페이지당 영화 정보 reload 함수 
  // exception3 추가 정보가 없을 경우 => handleScroll 함수를 종료
export async function searchStart (event, formEl, resultCT, modalWindow) {
  event.preventDefault()
  document.body.onscroll = ''
  const keyword = event.target[0].value
  if (!keyword) return

  const spinner = resultCT.querySelector('.spinner')
  let page = 1
  let getAdditional = true
  const data = await getData(keyword, page)
  
  if (!data.maxPage || !data.list) {
    noMovieInfo(formEl, resultCT)
  } else {
    initResult(resultCT)
    spinner.classList.remove('none')
    setTimeout(()=> {
      makeListItem(data.list, resultCT, modalWindow)
      document.body.onscroll = handleScroll
      spinner.classList.add('none')
    },1000)
  }
  
  async function handleScroll () {
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
        makeListItem(data.list, resultCT, modalWindow)
      }
    }
    getAdditional = true
  }  
}
