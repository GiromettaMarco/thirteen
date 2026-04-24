import type { AxiosStatic } from 'axios'
import axios from 'axios'

declare global {
  var axios: AxiosStatic
}

window.axios = axios

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
