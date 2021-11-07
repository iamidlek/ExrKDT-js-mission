import settedAxios from '~/api/axiosCustomSet'

export async function getTree() {
  const { data } = await settedAxios.get()
  return data
}

export async function getDetail(id) {
  const { data } = await settedAxios.get(`/${id}`)
  return data
}
