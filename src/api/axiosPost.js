import settedAxios from '~/api/axiosCustomSet'

export async function createItem(parentId, title, content) {
  let options
  // 부모 아이디 없으면 최상위
  if (parentId === 0) {
    options = {
      title,
      content
    }
  }  else {
    options = {
      parentId,
      title,
      content
    }
  } 
  await settedAxios.post('', options)
}
