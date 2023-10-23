import axios from "axios";

const newsAPI = axios.create({
    baseURL: 'https://nc-news-hi1e.onrender.com/api'
})

export function getAllArticles() {
    return newsAPI.get('/articles?limit=1000')

}

export function getArticleById(article_id) {
    return newsAPI.get(`/articles/${article_id}`)
}

export function getCommentsByArticleId(article_id) {
    console.log(article_id);
    return newsAPI.get(`/articles/${article_id}/comments`)
}