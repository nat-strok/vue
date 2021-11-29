import axios from './axios'

const api = {
    getPosts() {
        return axios.get('/posts/')
    },
    getSinglePost(id) {
        return axios.get(`/posts/${id}`)
    },
    getCurrUser(id) {
        return axios.get(`/users/${id}`)
    },
    getCurrUserPosts(params = {}) {
        return axios.get('/posts/', params)
    }
}

export default api