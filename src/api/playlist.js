import request from '@/utils/request.js'
const baseURL = 'http://localhost:3000'

export function fetchList(params) {
    return request({
        params,
        url: `${baseURL}/playlist/getList`,
        method: 'get'
    })
}
export function update(params) {
    return request({
        url: `${baseURL}/playlist/updatePlayList`,
        data: {
            ...params
        },
        method: 'post'
    })
}