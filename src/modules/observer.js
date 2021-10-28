// params 변경할 요소: top버튼, 감시 대상 요소: input태그 
// return 해당 요소가 화면에 보이기, 안보이기 시작하는 때를 감지하는 옵져버 설치
// aciton 감지 되면 top으로 이동하는 버튼을 활성화, 비활성화 시킨다
export function observer (modiEl, target) {
  const observerUp = new IntersectionObserver(handleTopBtn,{ threshold: 1 })
  const observerDown = new IntersectionObserver(handleTopBtn,{ threshold: 0 })
  function handleTopBtn(entries) {
    entries.forEach( entry => {
      if (entry.isIntersecting) {
        modiEl.classList.add('none')
      } else {
        modiEl.classList.remove('none')
      }
    })
  }
  return observerUp.observe(target) ,observerDown.observe(target)
}
