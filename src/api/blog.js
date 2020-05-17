import request from '@/utils/request.js'
const baseURL = 'http://localhost:3000'

export function getList(params) {
    return request({
        url: `${baseURL}/blog/list`,
        method: 'get',
        params: {
            ...params
        }
    })
}
export function del(params) {
    return request({
        url: `${baseURL}/blog/delBlog`,
        data: {
            ...params
        },
        method: 'post'
    })
}