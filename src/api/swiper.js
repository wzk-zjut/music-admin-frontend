import request from '@/utils/request.js'
const baseURL = 'http://localhost:3000'

export function getList() {
    return request({
        url: `${baseURL}/swiper/getList`,
        method: 'get'
    })
}