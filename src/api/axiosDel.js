import settedAxios from '~/api/axiosCustomSet'

export async function deleteItem(id) {
  await settedAxios.delete(`/${id}`)
}
