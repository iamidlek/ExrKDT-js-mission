import axios from 'axios'

// const { apikey } = process.env

const axiosCustomSet = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
  headers: {
    'content-type': 'application/json',
    apikey: 'FcKdtJs202110',
    username: 'YooHyungChul'
  },
})
export default axiosCustomSet
