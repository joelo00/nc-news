import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { getArticleById } from '../axios'
function SingleArticlePage() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchArticle = async () => {
        const { data: { article } } = await getArticleById(article_id);
        setArticle(article);
        setLoading(false);
      };
  
      fetchArticle();
    }, [article_id]);
  
    return (
      loading ? <h2>Loading...</h2> :
        <div className='display-single-article'>
          <h2>{article.title}</h2>
          <p>Written by: {article.author}</p>
          <img className='display-single-article-image' src={article.article_img_url} alt={article.title} />
          <p className='article-body'>{article.body}</p>
          <div className='article-info'>
                        <p>Votes: {article.votes}  </p>
                        <p>Topic: {article.topic} </p>
                        <p>Date: {article.created_at.slice(0,10)}</p>
                    </div>
        </div>
    );
  }

export default SingleArticlePage