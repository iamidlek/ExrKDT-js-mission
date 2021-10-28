// params 영화 제목, 영화 포스터 주소, 모달 요소
// action 더 큰 파일을 요청하는 주소로 변경, 모달이 화면에 보이게 한다
export function modal (title, poster, modalWindow) {
  const bigImgEl = document.createElement('img')
  const url = poster.replace('_V1_SX300','_V1_SX700')
  bigImgEl.src = url
  bigImgEl.alt = title
  bigImgEl.title = title
  modalWindow.append(bigImgEl)
  document.body.style.overflow = 'hidden'
  modalWindow.classList.remove('closed')
}

// event.currenttarget = modalWindow = this
// action 한번더 클릭하게 되면 모달이 종료된다 
export function modalClose () {
  document.body.style.overflow = 'auto'
  this.querySelector('img').remove()
  this.classList.add('closed')
}
