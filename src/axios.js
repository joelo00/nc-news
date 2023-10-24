import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://nc-news-hi1e.onrender.com/api'
})

export function getAllArticles() {
    return newsAPI.get('/articles?limit=1000')
}

export function getArticlesByTopic (topic) {
    return newsAPI.get(`/articles?topic=${topic}`)
}

export function getArticleById(article_id) {
    return newsAPI.get(`/articles/${article_id}`)
}

export function getCommentsByArticleId(article_id) {
    return newsAPI.get(`/articles/${article_id}/comments`)
}

export function patchArticle(article_id, inc_votes) {
    return newsAPI.patch(`/articles/${article_id}`, {inc_votes})
}

export function postCommentOnArticle(article_id, body, username='jessjelly') {
    return newsAPI.post(`/articles/${article_id}/comments`, {body, username})
}
