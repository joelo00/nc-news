import { useEffect, useState } from 'react'
import { getAllArticles, getArticlesByTopic, sortArticles } from '../../axios'
import { Link } from 'react-router-dom'

export function DisplayArticles({articles, loading}) {
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