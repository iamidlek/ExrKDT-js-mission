import settedAxios from '~/api/axiosCustomSet'

export async function fixItem(id, parentId, title, content) {
  // 내용만 수정하는 경우 parentId를 주지 않는다
  let options
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

  await settedAxios.put(`/${id}`,options)
}
