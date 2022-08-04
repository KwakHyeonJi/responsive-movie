import axios from 'axios'
import qs from 'qs'

import apiConfig from './apiConfig'

const axiosClient = axios.create({
    baseURL: apiConfig.baseURL,
    paramsSerializer: (params) => qs.stringify({ ...params, api_key: apiConfig.apiKey }),
})

export default axiosClient
