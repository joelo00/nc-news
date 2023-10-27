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

export function getArticlesByQuery (topic, sort_by, order='desc') {
    let articleQueries = ''
    if (topic) articleQueries += `&topic=${topic}`
    if (sort_by) articleQueries += `&sort_by=${sort_by}`
    if (order) articleQueries += `&order=${order}`
    if (articleQueries) {
        articleQueries = '?' + articleQueries.substring(1); // Remove the leading '&'
      }
    return newsAPI.get(`articles${articleQueries}`)
    
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

export function sortArticles(sort_by, order, topic) {
    return !topic ? newsAPI.get(`/articles?sort_by=${sort_by}&order=${order}`) : newsAPI.get(`/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`)
}


export function deleteComment(comment_id) {
    return newsAPI.delete(`/comments/${comment_id}`)

}

export function getUsers () {
    return newsAPI.get('/users')
}