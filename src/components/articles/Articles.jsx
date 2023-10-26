import { useEffect, useState } from 'react'
import { getAllArticles, getArticlesByTopic, sortArticles } from '../../axios'
import { Link } from 'react-router-dom'
import {SearchForm} from './Search-Form'
import {DisplayArticles} from './Display-Articles.jsx'


function Articles() {
    const [articles, setArticles] = useState([{"article_id":34,"title":"The Notorious MSG’s Unlikely Formula For Success","topic":"cooking","author":"grumpy19","created_at":"2020-11-22T11:13:00.000Z","votes":0,"article_img_url":"https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700","comment_count":11}, {"article_id":12,"title":"The battle for Node.js security has only begun","topic":"coding","author":"tickle122","created_at":"2020-11-15T13:25:00.000Z","votes":0,"article_img_url":"https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?w=700&h=700","comment_count":7}])
    const [loading, setLoading] = useState(false)
    return <>
    <SearchForm setArticles={setArticles} setLoading={setLoading} />
    <DisplayArticles articles={articles} loading={loading} />
    </>
}




export default Articles