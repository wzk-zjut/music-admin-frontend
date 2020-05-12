import request from '@/utils/request.js'
const baseURL = 'http://localhost:3000'

export function fetchList(params) {
    return request({
        params,
        url: `${baseURL}/playlist/getList`,
        method: 'get'
    })
}