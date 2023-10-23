import { useState } from 'react'
import { getAllArticles } from '../axios'
import { Link } from 'react-router-dom'
function Articles() {
    const [articles, setArticles] = useState([{"article_id":34,"title":"The Notorious MSG’s Unlikely Formula For Success","topic":"cooking","author":"grumpy19","created_at":"2020-11-22T11:13:00.000Z","votes":0,"article_img_url":"https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700","comment_count":11}, {"article_id":12,"title":"The battle for Node.js security has only begun","topic":"coding","author":"tickle122","created_at":"2020-11-15T13:25:00.000Z","votes":0,"article_img_url":"https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?w=700&h=700","comment_count":7}])
    const [loading, setLoading] = useState(false)
    return <>
    <SearchForm setArticles={setArticles} setLoading={setLoading} />
    <DisplayArticles articles={articles} loading={loading} />
    </>
}

function SearchForm({setArticles, setLoading}) {

    const displayAllArticles = async () => {
        setLoading(true)
        const {data : {articles}} = await getAllArticles()
        setLoading(false)
        setArticles(articles)
    }
    return (
        <>
        <form>
            <label htmlFor="search"></label>
            <input type="text" placeholder="search for articles" id="search" />
            <button>Search</button>
        </form>
        <button onClick={displayAllArticles}>View All Articles </button>
        </>
    )
}

function DisplayArticles({articles, loading}) {
    return (
        loading ? <h2>Loading...</h2> :
        <div className='display-articles-container'>
        {articles.map(article => {
            return (
                <div className='display-article' key={article.article_id}>
               <Link to={`/articles/${article.article_id}`}>

                    <h2>{article.title}</h2>
                    <p>Written by: {article.author}</p>
                    <img className='display-article-image' src={article.article_img_url}/>
                    <div className='article-info'>
                        <p>Votes: {article.votes}  </p>
                        <p>Topic: {article.topic} </p>
                        <p>Date: {article.created_at.slice(0,10)}</p>
                    </div>

                </Link>
                </div>
            )
        })}
        </div>
    )
}

export default Articles