import axios from 'axios'
import store from '~/store'

const { apikey } = process.env
const username = store.state.workspace.userName

const settedAxios = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/notion/workspaces',
  headers: {
    'content-type': 'application/json',
    apikey,
    username
  },
})
export default settedAxios
