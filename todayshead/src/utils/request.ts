/**
 * @description [ axios 请求封装]
 */
import axios from 'axios'
import router from '../router'

const service = axios.create({
    baseURL: '/api', // url = base url + request url
    timeout: 5000,
    withCredentials: true,  // send cookies when cross-domain requests
    headers: {
        // clear cors
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
    }
})

export default service